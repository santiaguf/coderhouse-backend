import { faker } from '@faker-js/faker';
import fs from 'fs';

let str = "NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR;EMOJI\n";

for (let i = 0; i < 20; i++) {
  str += faker.name.firstName() +
  ';' + faker.name.lastName() +
  ';' + faker.internet.email() +
  ';' + faker.name.jobTitle() +
  ';' + faker.random.locale() +
  ';' + faker.internet.emoji() + '\n';
}


fs.writeFile('data.csv', str, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('archivo guardado')
});