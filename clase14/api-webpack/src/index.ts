import express from 'express';
import { getTime } from './lib/utils';
import Persona from './persona';

const persona: Persona = new Persona("Coder", "house");

const app = express();

app.get('/', (req, res) => {
  res.send({
    time: getTime(),
    fullName: persona.getFullName(),
  });
});

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (error) => {
  console.log('Error starting server', error);
});




