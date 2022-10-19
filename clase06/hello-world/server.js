const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hola mundo')
});

server.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});
