// -------------- MODO FORK -------------------
//pm2 start server.js --name="Server1" --watch -- 8081 FORK

// -------------- MODO CLUSTER -------------------
//pm2 start server.js --name="Server2" --watch -- 8082 CLUSTER

// -------------- MODO FORK con directorio estatico -------------------
//pm2 start server.js --name="Server3" --watch -- 8081 FORK STATIC

// -------------- MODO CLUSTER con directorio estatico -------------------
//pm2 start server.js --name="Server2" --watch -- 8082 CLUSTER STATIC


//pm2 list
//pm2 delete id/name
//pm2 desc name
//pm2 monit
//pm2 --help
//pm2 logs
//pm2 flush

// ------------------ NGINX ----------------------
//http://nginx.org/en/docs/windows.html
//start nginx
//tasklist /fi "imagename eq nginx.exe"
//nginx -s reload
//nginx -s quit

import express from 'express'
import cluster from 'cluster'
import * as os from 'os'

const modoCluster = process.argv[3] == 'CLUSTER';

// MASTER
if (modoCluster && cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`Primary ${process.pid} is running`);
  console.log(`número de procesadores: ${numCPUs}`);

  for(let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
    cluster.fork();
  })
}
else {
  const app = express();
  const PORT = parseInt(process.argv[2]) || 8080;
  const STATIC = process.argv[4] == 'STATIC';

  if(STATIC){

    app.use(express.static('/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

  }


  app.get('/datos', (req, res) => {
    res.send(`Server en Port(${PORT}) - PID ${process.pid} - FyH ${new Date().toLocaleString()}`);
  })

  const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
  });
  server.on('error', error => console.log(`Error en servidor ${error}`));
}