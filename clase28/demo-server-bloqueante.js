const http = require('http');

const calculo = () => {
  let sum = 0;
  for(let i=0; i<6e9; i++) {
    sum += i;
  }
  return sum;
}

let visitas = 0;

const server = http.createServer();
server.on('request', (req, res) => {
  let { url } = req
  if(url === '/calcular') {
    const suma = calculo();
    res.end(`La suma es ${suma}`);
  } else if(url === '/'){
    res.end(`Visitas: ${++visitas}`);
  }

})

const port = 8080;
server.listen(port, err => {
  if(err) throw new Error(`Error al iniciar el servidor ${err}`);
  console.log(`Servidor escuchando en http://localhost:${port}`)
})