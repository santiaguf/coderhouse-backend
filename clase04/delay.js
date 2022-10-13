const delay = ret => {for(let i=0;i<ret*3e6;i++);};

function hacerTarea(num) {
  console.log(`Haciendo tarea ${num}`);
  delay(500);
}

console.log('Iniciando tareas');
hacerTarea(1);
hacerTarea(2);
hacerTarea(3);
hacerTarea(4);
hacerTarea(5);
console.log('Todas las tareas terminadas');
console.log('Otras tareas..');