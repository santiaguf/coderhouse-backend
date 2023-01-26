const express = require('express');
const app = express();

function calcularRandoms(min, max, cant) {
  let randoms = [];

  for (let i = 0; i < cant; i++) {
    let randomNumber = parseInt(Math.floor(Math.random() * (max - min)) + min);
    randoms.push(randomNumber);
  }

  return randoms;
}

app.get('/random-debug', (req, res) => {
  let randoms = calcularRandoms(1, 10, 10000);
  console.log(randoms);
  res.send({ randoms });
});

app.get('/random-nodebug', (req, res) => {
  let randoms = calcularRandoms(1, 10, 10000);
  res.send({ randoms });
});

const PORT = parseInt(process.argv[3]) || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));