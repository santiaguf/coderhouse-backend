import express from 'express'
import { faker } from '@faker-js/faker'

faker.locale = 'es'

const app = express()


function getRandomPerson(id) {
  return {
    id,
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    color: faker.color.human()
  }
}

app.get('/test', (req, res) => {
  const quantity = Number(req.query.cant) || 10
  res.json(Array.from(Array(quantity), (v, i) => getRandomPerson(i+1)))
})

const port = 8080
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

server.on('error', (err) => {
  console.log(`Server error: ${err}`)
});

