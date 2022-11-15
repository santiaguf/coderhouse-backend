import * as operaciones from './lib/operaciones';

const mensaje:string = 'hola desde typescript!'
console.log(mensaje);

let num1:number = 10, num2:number = 5;

console.log(`Suma: ${operaciones.sumar(num1, num2)}`);
console.log(`Resta: ${operaciones.restar(num1, num2)}`);
console.log(`Multiplicación: ${operaciones.multiplicar(num1, num2)}`);
console.log(`División: ${operaciones.dividir(num1, num2)}`);