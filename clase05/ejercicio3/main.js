const chalk = require('chalk');

let productos = [
  {id: 1, nombre: "Escuadra", precio: 323.45},
  { id:2, nombre:'Calculadora', precio:234.56 },
  { id:3, nombre:'Globo Terráqueo', precio:45.67 },
  { id:4, nombre:'Paleta Pintura', precio:456.78 },
  { id:5, nombre:'Reloj', precio:67.89 },
  { id:6, nombre:'Agenda', precio:78.90 }
]

const getNombres = () => productos.map(producto => producto.nombre).join(', ')

const getPrecioTotal = () => {
  let total = 0
  productos.forEach(producto => {
    total += producto.precio
  })
  return total
}

const getHighestOrLowestPrice = (type) => {
  let prices = productos.map(productos => productos.precio)
  return type === 'highest' ? Math.max(...prices) : Math.min(...prices)

}

const getAverage = () => getPrecioTotal() / productos.length;

const to2Decimals = (number) => Number(number.toFixed(2))

let info = {
  nombres : getNombres(),
  total : getPrecioTotal(),
  promedio : to2Decimals(getAverage()),
  'precio del producto mas costoso' : getHighestOrLowestPrice('highest'),
  'precio del producto menos costoso': getHighestOrLowestPrice('lowest')
}

console.log(info)

console.log(chalk.blue(getNombres()))