const response = await fetch('http://jsonplaceholder.typicode.com/todos/1');
const data = await response.json();
console.log(data);