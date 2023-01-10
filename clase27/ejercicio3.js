const yargs = require('yargs/yargs')(process.argv.slice(2));

/* como usar:
node ejercicio3.js 1 2 3 -m dev -p 8080 -d
node ejercicio2.js 1 2
*/

const { modo, puerto, debug, _} = yargs
  .boolean('debug')
  .alias({
    m: 'modo',
    p: 'puerto',
    d: 'debug'
  })
  .default({
    modo: 'prod',
    puerto: 0,
    debug: false
  })
  .argv;

console.log({modo, puerto, debug, otros: _ });