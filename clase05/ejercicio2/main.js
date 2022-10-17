let numeros = {};

const getRandom = () => parseInt(Math.random()*20) + 1;

for(let i=0; i<10000; i++){
    let numero = getRandom();
    if(!numeros[numero]) numeros[numero] = 0
        numeros[numero]++;
    }
console.log(numeros);