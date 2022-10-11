let nombre = 'pepe';
let edad = 25;
const precio = 99.90;
const nombreSeriesFavoritas = ['Dark','Mr Robot', 'Castlevani'];

const peliculasFav = [
  {
    nombre: 'Rapido y furioso',
    anioEstreno: 2008,
    protagonistas: ['toreto', 'brian', 'roman', 'letty']
  }
]

console.log(nombre);
console.log(edad);
console.log(precio);
console.log(nombreSeriesFavoritas);
console.log(peliculasFav);

edad++;

console.log(`creciste y ahora tienes ${edad}`);


nombreSeriesFavoritas.push('Black Mirror');

console.log(nombreSeriesFavoritas);