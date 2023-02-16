import express from "express";
import operationsRoutes from "./routes/operations.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();


app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.use("/api/v1/operations", operationsRoutes);
app.use("/", authRoutes);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));