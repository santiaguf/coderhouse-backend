const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`<h1 style="color:blue;">Bienvenidos al servidor express</h1>`);
})
let visitas = 0;

app.get('/visitas', (req, res) => {
  res.send(`la cantidad de visitas es ${++visitas}`);
})

app.get('/fecha-hora', (req, res) => {
  res.send({fyh: new Date().toLocaleString()});
})

app.get('/saludo', (req, res) => {
  let person = req.query.person;
  res.send(`Hola ${person}`);
})

app.get('/saludo/:name', (req, res) => {
  let person = req.params.name;
  res.send(`Hola ${person}`);
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
server.on('error', (err) => console.log(`Error en el servidor ${err}`))