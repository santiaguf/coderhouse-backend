const express = require('express');

const app = express();

const port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el http://localhost:${port}`);
});

server.on('error', (error) => {
  console.log('Error en el servidor:', error);
});


