const http = require('http');

const getMessage = () => {

  let hour = new Date().getHours();

  if(hour >= 6 && hour <= 12) {
    return 'Buenos días';
  }else if(hour >= 13 && hour <= 19) {
    return 'Buenas tardes';
  }else if((hour >= 20 && hour <= 23) || (hour => 0 && hour <= 5)) {
    return 'Buenas noches';
  }
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(getMessage());
});

server.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});