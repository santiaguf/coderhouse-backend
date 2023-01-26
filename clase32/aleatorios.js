const express = require('express');
const app = express();

/*
node --prof aleatorios.js
node --prof-process isolate-[XXXXXXX].log > prof_slow.txt

node --inspect aleatorios.js
// este comando de abajo se ejecuta en el navegador google chrome
chrome://inspect


TESTS:
artillery quick -c 50 -n 50 "http://localhost:8080/random-debug" > artillery_slow.txt
artillery quick -c 50 -n 50 "http://localhost:8080/random-nodebug" > artillery_slow_2.txt

*/


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