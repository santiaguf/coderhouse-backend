const express = require('express');

const app = express();

const PORT = parseInt(process.argv[2]) || 8080;

app.get('/', (req, res) => {
  res.send(`Servidor express en ${PORT} - <b>pid ${process.pid}</b> - ${new Date().toLocaleString()}`);
});

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));