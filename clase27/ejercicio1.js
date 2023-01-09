for (let j = 0; j < process.argv.length; j++){
  console.log(j + ' -> ' + (process.argv[j]));
}

if(process.argv[2] === 'coder'){
  console.log('hola CoderHouse')
}