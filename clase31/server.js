const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const logger = require('./loggers/log4js');
//const logger = require('./loggers/winston');
//const logger = require('./loggers/pino');

const app = express();

app.get('/sumar', (req, res) => {
  const { n1, n2} = req.query;

  if (!n1 || !n2) {
    logger.error('No se recibieron los parámetros n1 y n2');
    res.status(400).send('No se recibieron los parámetros n1 y n2');
  } else {
    logger.info(`Se recibieron los parámetros n1: ${n1} y n2: ${n2}`);
    const resultado = parseInt(n1) + parseInt(n2);
    res.send(`El resultado de ${n1} + ${n2} es ${resultado}`);
  }

})

app.get('*', (req, res) => {
  const { url, method } = req;
  logger.warn(`Se intentó acceder a ${url} con método ${method}, no está implementado`);
  res.status(404).send(`No se encontró el recurso ${url}`);
})

const PORT = parseInt(process.argv[2]) || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));