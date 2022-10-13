const fs = require('fs');

fs.promises.readFile('info.txt', 'utf-8')
  .then(contenido => {
    console.log('info.txt se leyó correctamente: ');


    const info = JSON.parse(contenido);
    console.log(info);

    const packageJsonObj = info.contenidoObj;

    packageJsonObj.author = 'CoderHouse';

    fs.promises.writeFile('package.json.coder', JSON.stringify(packageJsonObj, null, 2))
      .then(() => console.log('package.json.coder se escribió correctamente'))
      .catch(error => console.log(`No se pudo escribir: ${error.message}`))

  })
  .catch(error => console.log(`No se pudo leer: ${error.message}`))