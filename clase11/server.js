express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

const mensajes = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  console.log('Nuevo cliente conectado!');

  socket.on('mensaje', data => {
    mensajes.push({socketId: socket.id, mensaje: data, fecha: new Date()});
    io.sockets.emit('mensajes', mensajes);
  })
});

const port = 8080;

const server = httpServer.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));
