const express = require('express');
const { promises: fs} = require('fs');

const app = express();

app.engine('cte', async (filePath, options, callback) => {

  try {
    const content = await fs.readFile(filePath, 'utf8');
    const rendered = content.toString()
    .replace('^^titulo$$', '' + options.titulo + '')
    .replace('^^mensaje$$', '' + options.mensaje + '')
    .replace('^^autor$$', '' + options.autor + '')
    .replace('^^version$$', '' + options.version + '')
    return callback(null, rendered);
  }
  catch (err) {
    return callback(new Error(err));
  }
});

// si te aparece un error de ruta puedes quitar el __dirname y dejar ./views
app.set('views', __dirname + '/views');
app.set('view engine', 'cte');

app.get('/', (req, res) => {
  const datos = {
    titulo: 'Bienvenidos a mi sitio',
    mensaje: 'Este es mi sitio',
    autor: 'Juan Perez',
    version: '1.0.0'
  }

  res.render('plantilla1', datos)
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el http://localhost:${port}`);
});

server.on('error', (err) =>
  console.log('Error en el servidor:', err)
);