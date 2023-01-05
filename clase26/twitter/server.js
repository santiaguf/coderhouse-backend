const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: '/auth/twitter/callback',
  }, (token, tokenSecret, userProfile, done) => {
    console.log('profile', userProfile);
    return done(null, userProfile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


const app = express();

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Rutas
app.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.redirect('/datos');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/faillogin', (req, res) => {
  res.render('login-error', {});
});

app.get('/datos', (req, res) => {
  if(req.isAuthenticated()) {
    if(!req.user.contador){
      req.user.contador = 0
    }
  req.user.contador++
  res.render('datos', {
    nombre: req.user.displayName,
    username: req.user.username,
    foto: req.user.photos[0].value,
    contador: req.user.contador
  });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const port = 8080;
const server = app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));

server.on('error', error => console.log(`Error en servidor ${error}`));


