const express = require('express');
const router = express.Router();
const debug = require('debug')('productos:productos');

function makeRandomId() {
    const nums = [];

    for (let i = 0; i < 4; i++) {
        nums.push(Math.floor(Math.random() * 10));
    }
    return `${Date.now()}${nums.join('')}`;
}

const productos = [];

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
    debug(`escuchando en ${JSON.stringify(productos)}`);
    res.json(productos);
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.sendStatus(404);
    }
    res.json(producto);
});

router.post('/', (req, res, next) => {
    const { nombre, precio } = req.body;
    const producto = { id: makeRandomId(), nombre, precio: Number(precio) }
    productos.push(producto);
    res.status(201).json(producto);
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { nombre, precio } = req.body;
    const producto = { id, nombre, precio: Number(precio) }
    const index = productos.findIndex(p => p.id === id);

    if (index == -1) {
        return res.sendStatus(404);
    }

    productos.splice(index, 1 , producto)
    res.json(producto);
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const index = productos.findIndex(p => p.id === id);

    if (index == -1) {
        return res.sendStatus(404);
    }

    productos.splice(index, 1);
    res.sendStatus(204);
});

module.exports = router;