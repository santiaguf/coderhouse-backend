const operacion = (a, b, op) => op(a,b)


const suma = (a,b) => a + b
const resta = (a,b) => a - b
const multiplicacion = (a,b) => a * b
const division = (a,b) => a / b
const modulo = (a,b) => a % b

console.log(operacion(20, 4, suma))
console.log(operacion(20, 4, resta))
console.log(operacion(20, 4, multiplicacion))
console.log(operacion(20, 4, division))
console.log(operacion(20, 3, modulo))

