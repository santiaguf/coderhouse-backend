const socket = io.connect();

const inputBox = document.querySelector('input')
inputBox.addEventListener('input', () => {
  socket.emit('mensaje', inputBox.value);
});

socket.on('mensajes', data => {
  document.querySelector('p').innerHTML = data;
})