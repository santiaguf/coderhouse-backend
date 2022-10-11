// classic function
function mostrarLista(lista) {

  if(lista.length == 0) {
    console.log("No hay elementos en la lista");
  } else {
    console.log(lista);
  }

}

mostrarLista([]);
mostrarLista([1,4,67]);

// arrow function
const showList = (list) => {
  if(list.length == 0) {
    console.log("empty list");
  } else {
    console.log(list);
  }
}

showList([]);
showList([-5,0,2]);


// iife
(function mostrarLista(lista) {

  if(lista.length == 0) {
    console.log("No hay elementos en la lista");
  } else {
    console.log(lista);
  }

})([1,2,3,4,5])

function crearMultiplicador(multiplicador) {
  return function (numero) {
    return numero * multiplicador;
  }
}

const duplicar = crearMultiplicador(2);

console.log(duplicar(8));
console.log(duplicar(9));

const triplicar = crearMultiplicador(3);
console.log(triplicar(3));
console.log(triplicar(5));

