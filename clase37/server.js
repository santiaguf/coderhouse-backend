import  express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hola Yarn");
    }
);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));