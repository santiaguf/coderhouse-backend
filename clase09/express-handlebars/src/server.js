const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('datos', {
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 30,
    email: 'info@coderhouse.com',
    telefono: '1234567890'
  })
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});