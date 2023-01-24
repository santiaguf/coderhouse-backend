const express = require('express');
const compression = require('compression');

const app = express();

const mensaje = 'Hola qué tal';
const mensajeLargo = mensaje.repeat(1000);

app.get('/saludo', (req, res) => {
  res.send(mensajeLargo);
});

app.get('/saludozip', compression(), (req, res) => {
  res.send(mensajeLargo);
});

const PORT = parseInt(process.argv[2]) || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));