const express = require('express');

const app = express();

const frase = "Hola mundo cómo están";

app.get('/', (req, res) => {
    res.send(frase);
});

app.get('/api/letras/:num', (req, res) => {
  const num = parseInt(req.params.num);

  if(isNaN(num)) {
    return res.send({ error: 'el parámetro ingresado no es un número' });
  }

  if(num < 1 || num > frase.length) {
    return res.send({ error: `el número ingresado está fuera del rango debe ser entre 1 y ${frase.length} ` });
  }

  res.send(frase[num - 1]);

})

app.get('/api/palabras/:num', (req, res) => {
  const num = parseInt(req.params.num);

  if(isNaN(num)) {
    return res.send({ error: 'el parámetro ingresado no es un número' });
  }

  const palabras = frase.split('');
  console.log(palabras);

  if(num < 1 || num > palabras.length) {
    return res.send({ error: `el número ingresado está fuera del rango debe ser entre 1 y ${palabras.length} ` });
  }

  res.send(palabras[num - 1]);
})



const Port = 8080;

const server = app.listen(Port, () => {
    console.log(`Servidor escuchando en http://localhost:${Port}`);
})

server.on('error', error => {
    console.log('Error en el servidor:', error);
});

