import express, { json } from 'express';

const numbers = [];

const app = express();

app.use(json());

app.post('/ingreso', (req, res) => {
    const { number } = req.body;
    numbers.push(number);
    res.send(` Numero ${number} ingresado`);
})

app.get('/egreso', (req, res) => {
    res.json({ numbers });
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));