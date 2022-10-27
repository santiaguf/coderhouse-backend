const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage : storage });

app.post('/subir', upload.single('miArchivo'), (req, res, next) => {

  const file = req.file;
  if(!file) {
    const error = new Error('Por favor sube un archivo');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(`Archivo <b>${file.originalname}</b> subido correctamente`);
});


const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
server.on('error', (err) => console.log('Error en el servidor:', err));
