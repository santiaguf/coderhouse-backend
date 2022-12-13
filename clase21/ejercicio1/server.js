import express from 'express'

const app = express()

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana'];
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomPerson() {
  return {
    nombre: getRandom(nombres),
    apellido: getRandom(apellidos),
    color: getRandom(colores)
  }
}

app.get('/test', (req, res) => {
  const objs = []
  for (let i = 0; i < 10; i++) {
    objs.push(getRandomPerson())
  }
  res.json(objs)
})

const port = 8080
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

server.on('error', (err) => {
  console.log(`Server error: ${err}`)
});

