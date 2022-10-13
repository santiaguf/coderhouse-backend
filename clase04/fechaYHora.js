const fs = require('fs');

let fechayhoraactual = new Date().toLocaleDateString();

try {
  fs.writeFileSync('fyh.txt', fechayhoraactual);
} catch (error) {
  throw new Error(`No se pudo escribir: ${error.message}`)
}

try {
  const contenido = fs.readFileSync('fyh.txt', 'utf-8');
  console.log(contenido);
} catch (error) {
  throw new Error(`No se pudo leer: ${error.message}`)
}