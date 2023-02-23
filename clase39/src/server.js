import express from "express";
import handlebars from "express-handlebars";
import htmlWire from "./routes/htmlWire.routes.js";
import dataWire from "./routes/dataWire.routes.js";
import singletonRoutes from "./routes/singleton.routes.js";

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "index.hbs",
    })
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use("/html-onwire", htmlWire);
app.use("/data-onwire", dataWire);
app.use("/datos", singletonRoutes);

app.use("/", (req, res) => {
    res.redirect("/html-onwire");
});


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
