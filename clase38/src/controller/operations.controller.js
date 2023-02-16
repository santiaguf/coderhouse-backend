import { sum, substract, multiply, divide, getAll } from '../business/operations.business.js';

const sumOp = async (req, res) => {
    let { a, b } = req.query;
    res.send(`La suma de ${a} y ${b} es ${await sum(Number(a), Number(b))}`);
}

const substractOp = async (req, res) => {
    let { a, b } = req.query;
    res.send(`La resta de ${a} y ${b} es ${await substract(Number(a), Number(b))}`);
}

const multiplyOp = async (req, res) => {
    let { a, b } = req.query;
    res.send(`La multiplicacion de ${a} y ${b} es ${await multiply(Number(a), Number(b))}`);
}

const divideOp = async (req, res) => {
    let { a, b } = req.query;
    res.send(`La division de ${a} y ${b} es ${await divide(Number(a), Number(b))}`);
}

const getAllOp = async (req, res) => res.send(await getAll());


export default {
    sumOp,
    substractOp,
    multiplyOp,
    divideOp,
    getAllOp
}