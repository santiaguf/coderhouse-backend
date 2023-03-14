import express from "express";
import GraphQLController from "./controller/grapql.controllers.js";

const app = express();

app.use(express.static("public"));

app.use('/graphql', new GraphQLController());

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
