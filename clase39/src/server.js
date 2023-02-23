import express from "express";
import habdlebars from "express-handlebars";
import htmlWire from "./routes/htmlWire.routes.js";

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.engine(
    "hbs",
    habdlebars.engine({
        extname: "hbs",
        defaultLayout: "index.hbs",
    })
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use("/html-onwire", htmlWire);


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
