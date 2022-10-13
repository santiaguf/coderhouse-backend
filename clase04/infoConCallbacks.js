const fs = require('fs');

fs.readFile('package.json', 'utf8', (error, contenido) => {
  if (error) {
    throw new Error(`No se pudo leer: ${error.message}`)
  }

  console.log('package.json se leyó correctamente: ');


  const info = {
    contenidoStr : contenido,
    contenidoObj : JSON.parse(contenido),
    size : contenido.length
  }

console.log(info)

  fs.writeFile('info.txt', JSON.stringify(info, null, 2), error => {
    if (error) {
      throw new Error(`No se pudo escribir: ${error.message}`)
    }

    console.log('info.txt se escribió correctamente');
  })

})

