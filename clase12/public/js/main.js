const socket = io.connect();

function addMessage() {
  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;

  const nuevoMensaje = {
    nombre: nombre,
    mensaje: mensaje
  };

  socket.emit('new-message', nuevoMensaje);
  return false;
}

function render(data) {
  const html = data.map((elem, index) => {
    return (`
      <div>
        <strong>${elem.nombre}</strong>:
        <em>${elem.mensaje}</em>
      </div>
    `);
  }).join(' ');

  document.getElementById('messages').innerHTML = html;
}

socket.on('mensajes', function(data) {
  render(data);
});