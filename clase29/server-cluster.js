const express = require('express');
const cluster = require('cluster');

const app = express();

const numCPUs = require('os').cpus().length;

// master
if (cluster.isMaster) {
  console.log(numCPUs);
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
    cluster.fork();
  });
}

// workers
else {
  const PORT = parseInt(process.argv[2]) || 8080;

  app.get('/', (req, res) => {
    res.send(`Servidor express en ${PORT} - <b>pid ${process.pid}</b> - ${new Date().toLocaleString()}`);
  });

  const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
  });
  server.on('error', error => console.log(`Error en servidor ${error}`));
}
