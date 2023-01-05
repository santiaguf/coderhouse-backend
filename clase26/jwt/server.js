const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const exphbs = require('express-handlebars');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.JWT_SECRET;

function generateToken(user) {
  const token = jwt.sign({ data: user}, PRIVATE_KEY, { expiresIn: '24h' });
  return token;
};

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ message: 'No hay token' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if(err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = decoded.data;
    next();
  });
};

// persistencia
const usuarios = [];

const app = express();


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

  const usuarioExistente = usuarios.find(u => u.username === username);

  if (usuarioExistente) {
    return res.json('register-error');
  }

  const user = {
    username,
    password,
    direccion,
  }

  usuarios.push(user)

  console.log(usuarios);

  res.redirect('/login')

});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const usuarioValido = usuarios.find(u => u.username === username && u.password === password);

  if (!usuarioValido) {
    return res.render('login-error');
  }

  const access_token = generateToken(usuarioValido);

  console.log(access_token);
  res.redirect('/datos')
});

app.get('/datos', auth, (req, res) => {

    res.render('datos', {
      datos: usuarios[0],
    });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
});

app.get('/', auth, (req, res) => {
    res.redirect('/datos');
});

const port = 8080;
const server = app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));

server.on('error', error => console.log(`Error en servidor ${error}`));

