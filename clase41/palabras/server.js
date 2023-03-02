import config from './config/config.js';
import express from 'express';
import cors from 'cors';
import PalabrasRoutes from './routes/palabraRoutes.js';

const app = express();

if(config.NODE_ENV == 'development') {
    app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const palabrasRoutes = new PalabrasRoutes();


app.use('/api/palabras', palabrasRoutes.start());

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));