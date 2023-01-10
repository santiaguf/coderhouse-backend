const dotenv = require('dotenv');
dotenv.config();

const modo = process.env.MODO || 'prod';
const puerto = process.env.PUERTO || 0;
const debug = process.env.DEBUG || false;

console.log({
  modo,
  puerto,
  debug
})