import express from 'express';

import Perimetro from './lib/perimetro';
import Superficie from './lib/superficie';

const app = express();

app.get("/perimetro", (req, res) => {
  const {figura, lado1, lado2, lado, radio} = req.query;

  let resultado: number;

  if (figura === "cuadrado" && lado) {
    resultado = Perimetro.cuadrado(Number(lado));
  } else if (figura === "rectangulo" && lado1 && lado2) {
    resultado = Perimetro.rectangulo(Number(lado1), Number(lado2));
  } else if (figura === "circulo" && radio) {
    resultado = Perimetro.circulo(Number(radio));
  } else {
    return res.send("parámetros inválidos");
  }

  res.json({
    calculo: "perimetro",
    figura,
    resultado,
  });
});

app.get("/superficie", (req, res) => {
  const {figura, lado1, lado2, lado, radio} = req.query;

  let resultado: number;

  if (figura === "cuadrado" && lado) {
    resultado = Superficie.cuadrado(Number(lado));
  } else if (figura === "rectangulo" && lado1 && lado2) {
    resultado = Superficie.rectangulo(Number(lado1), Number(lado2));
  } else if (figura === "circulo" && radio) {
    resultado = Superficie.circulo(Number(radio));
  } else {
    return res.send("parámetros inválidos");
  }

  res.json({
    calculo: "superficie",
    figura,
    resultado,
  });
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

