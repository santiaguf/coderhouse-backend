import { suma, resta, mult, div} from 'sb-calculadora';
import { save, getAll as getAllOps } from '../persistence/operations.persistence.js';

async function sum(a, b) {
    const resultOp = suma(a, b);

    await save({ params: [a, b] , result: resultOp, operation: 'suma', tiemstamp: Date.now() });
    return resultOp;
}

async function substract(a, b) {
    const resultOp = resta(a, b);

    await save({ params: [a, b] , result: resultOp, operation: 'resta', tiemstamp: Date.now() });
    return resultOp;
}

async function multiply(a, b) {
    const resultOp = mult(a, b);

    await save({ params: [a, b] , result: resultOp, operation: 'multiplicacion', tiemstamp: Date.now() });
    return resultOp;
}

async function divide(a, b) {
    const resultOp = div(a, b);

    await save({ params: [a, b] , result: resultOp, operation: 'division', tiemstamp: Date.now() });
    return resultOp;
}

async function getAll() {
    return await getAllOps();
}

export {
    sum,
    substract,
    multiply,
    divide,
    getAll
};

