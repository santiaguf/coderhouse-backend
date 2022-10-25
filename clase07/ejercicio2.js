const express = require('express');

const app = express();

app.get('/api/sumar/:num1/:num2',(req, res) => {
  const { num1, num2} = req.params;

  res.send({  suma: Number(num1) + Number(num2) });
})

app.get('/api/sumar/', (req, res) => {
  const { num1, num2} = req.query;

  res.send({  suma: Number(num1) + Number(num2) });
})

app.get('/api/operacion/:operacion', (req, res) => {
  const { operacion } = req.params;
  res.send({ operacion: eval(operacion) });
})

app.get('/api', (req, res) => {
  res.send({ mensaje: 'esto es un get para listar' });
})

app.post('/api', (req, res) => {
  res.send({ mensaje: 'esto es un post para crear' });
})

app.put('/api', (req, res) => {
  res.send({ mensaje: 'esto es un put para actualizar' });
})

app.delete('/api', (req, res) => {
  res.send({ mensaje: 'esto es un delete para borrar' });
})


const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}
);

server.on('error', (err) =>
  console.log('Error en el servidor:', err)
);
