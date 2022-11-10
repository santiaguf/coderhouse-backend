express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

const mensajes = [
  { nombre: "juan", mensaje: "Hola, qué tal?" },
  { nombre: "pedro", mensaje: "¿Bien bien y tú?" },
  { nombre: "ana", mensaje: "Genial!"}
];

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  console.log('Nuevo cliente conectado!');
  socket.emit('mensajes', mensajes);

  socket.on('new-message', data => {
    mensajes.push(data);
    io.sockets.emit('mensajes', mensajes);
  })
});

const port = 8080;

const server = httpServer.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));
