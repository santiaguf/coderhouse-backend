const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

// persistencia
const usuarios = [];

const app = express();

// middlewares

app.use(session({
    secret: 'c0d3rH0us3',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
}))

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// rutas

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html')
});

app.post('/register', (req, res) => {
  const { username, password, direccion } = req.body;
  const usuario = usuarios.find(u => u.username === username);

  if (usuario) {
    return res.render('register-error');
  }

  usuarios.push({ username, password, direccion })
  res.redirect('/login')

});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (!usuario) {
    return res.render('login-error');
  }

  req.session.username = username;
  req.session.contador = 0;
  res.redirect('/datos')
});

app.get('/datos', (req, res) => {
  if (req.session.username) {
    req.session.contador++;
    res.render('datos', {
      datos: usuarios.find(u => u.username === req.session.username),
      contador: req.session.contador
    });
  } else {
    return res.redirect('/login')
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
});

app.get('/', (req, res) => {
  if (req.session.username) {
    res.redirect('/datos')
  } else {
    res.redirect('/login')
  }
});

const port = 8080;
const server = app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));

server.on('error', error => console.log(`Error en servidor ${error}`));

