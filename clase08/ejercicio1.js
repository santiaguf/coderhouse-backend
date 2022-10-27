const express = require('express');
const { Router } = express

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

// mascotas
const routerPets = new Router();

routerPets.use(express.json());

const pets = [];

routerPets.get('/', (req, res) => {
  res.send(pets);
});

routerPets.post('/', (req, res) => {
  const { body } = req;
  console.log('el body: ')
  console.log(body);
  pets.push(body);
  res.send(body);
});

// personas

const routerPeople = new Router();

routerPeople.use(express.json());

const people = [];


routerPeople.get('/', (req, res) => {
  res.send(people);
});

routerPeople.post('/', (req, res) => {
  const { body } = req;
  people.push(body);
  res.send(body);
});



app.use('/mascotas', routerPets);
app.use('/personas', routerPeople);

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on('error', (err) =>
  console.log('Error en el servidor:', err)
);
