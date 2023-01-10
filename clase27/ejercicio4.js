const config = require('./config');

const modo = config.MODO || 'prod';
const puerto = config.PUERTO || 0;
const debug = config.DEBUG || false;

console.log({
  modo,
  puerto,
  debug
})