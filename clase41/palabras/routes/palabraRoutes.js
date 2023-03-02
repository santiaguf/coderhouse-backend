import express from 'express';
const router = express.Router();

import PalabrasController from '../controller/palabrasController.js';

class PalabrasRoutes {
    constructor() {
        this.palabrasController = new PalabrasController();
    }

    start() {
        router.get('/', this.palabrasController.obtenerPalabras);
        router.post('/', this.palabrasController.guardarPalabra);
        return router;
    }
}

export default PalabrasRoutes;