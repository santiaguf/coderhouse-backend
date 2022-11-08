const socket = io.connect();

const inputBox = document.querySelector('input');
const myButton = document.querySelector('button');

myButton.addEventListener('click', () => {
  socket.emit('mensaje', inputBox.value);
});

socket.on('mensajes', msjs => {
  const mensajesHtml = msjs.map(msj => `Fecha: ${msj.fecha} - SocketId: ${msj.socketId} -> mensaje: ${msj.mensaje}`).join('<br>')

  document.querySelector('p').innerHTML = mensajesHtml;
})