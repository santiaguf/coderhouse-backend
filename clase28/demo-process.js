const args = process.argv;

process.on('exit', code => {
  if(code) {
    console.log(`saliendo con código ${code}`);
  } else {
    console.log('saliendo sin código');
  }
})

process.on('uncaughtException', error => {
  console.log('se ha producido un error');
  console.log(error);
  switch(error.description) {
    case 'entrada vacia': return process.exit(-4)
    case 'error de tipo': return process.exit(-5)
    default: return process.exit()
  }
})

let total = 0;
function average(nums) {

  if (nums.length === 0) {
    throw {
      description: 'entrada vacia'
    }
  }

  for (const num of nums) {
    const val = Number(num);
    if (isNaN(val)) {
      throw {
        description: 'error de tipo',
        numeros: nums,
        tipos: nums.map(n => isNaN(n) ? typeof n : 'number')
      }
    } else {
      total += val;
    }
  }
  return total / nums.length;
}

const numeros = args.slice(2);
const promedio = average(numeros);
const max = Math.max(...numeros);
const min = Math.min(...numeros);
const executable = process.execPath.split('/').pop();
const rutaCompleta = process.execPath;
const platform = process.platform;
const version = process.version;
const pid = process.pid;

const datos = {
  numeros,
  promedio,
  max,
  min,
  rutaCompleta,
  platform,
  version,
  executable,
  pid
}

console.log(datos);