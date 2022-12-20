import express, { json } from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// recuerden que el secret, se debe manejar a traves de variables de entorno
app.use(cookieParser('coder19dic'));

app.use(json());

app.post('/cookies', (req, res) => {
  const { nombre, valor, tiempo } = req.body;
  console.log( nombre, valor, tiempo );
  if(!nombre || !valor) {
    res.status(400).json({ error: 'Faltan datos' });
  }
  if(tiempo){
    res.cookie(nombre, valor, { signed: true, maxAge: tiempo });
  } else {
    res.cookie(nombre, valor, { signed: true });
  }
  res.json({ proceso: 'ok' });
});

app.get('/cookies', (req, res) => {
  res.json({ normales: req.cookies, firmadas: req.signedCookies })
});

app.delete('/cookies/:nombre', (req, res) => {
  const { nombre } = req.params;

  if(nombre) {
    res.clearCookie(nombre);
    res.json({ proceso: 'ok' });
  } else {
    res.status(400).json({ error: 'Falta el nombre de la cookie' });
  }
});


const port = 8080;
const server = app.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));