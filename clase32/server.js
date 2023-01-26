const express = require('express');
const app = express();
const cluster = require('cluster');
const os = require('os');

/*
// comparación desde node
node server.js FORK
artillery quick -c 50 -n 50 "http://localhost:8080/random-debug" > artillery_fork.txt

node server.js CLUSTER
artillery quick -c 50 -n 50 "http://localhost:8080/random-debug" > artillery_cluster.txt


// comparación desde 0x

0x server.js
autocannon -d 20 -c 500 "http://localhost:8080/random-debug"
detenemos el server de 0x

0x server.js
autocannon -d 20 -c 500 "http://localhost:8080/random-nodebug"
detenemos el server de 0x
*/

const MODO_CLUSTER = process.argv[2] === 'CLUSTER';

// main
if (MODO_CLUSTER && cluster.isMaster) {
  const numCPu = os.cpus().length;

  console.log(`Master ${process.pid} is running`);
  console.log(`Forking for ${numCPu} CPUs`);

  for (let i = 0; i < numCPu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
    cluster.fork();
  })

} else {

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
}