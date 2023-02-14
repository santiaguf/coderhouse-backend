import express from "express";
import { suma, resta, mult, div } from "sb-calculadora";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/suma", (req, res) => {
    const { a, b } = req.query;
    const n1 = parseInt(a);
    const n2 = parseInt(b);
    res.send(`La suma de ${a} y ${b} es ${suma(n1, n2)}`);
});

app.get("/resta", (req, res) => {
    const { a, b } = req.query;
    res.send(`La resta de ${a} y ${b} es ${resta(a, b)}`);
});

app.get("/mult", (req, res) => {
    const { a, b } = req.query;
    res.send(`La multiplicación de ${a} y ${b} es ${mult(a, b)}`);
});

app.get("/div", (req, res) => {
    const { a, b } = req.query;
    res.send(`La división de ${a} y ${b} es ${div(a, b)}`);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));



