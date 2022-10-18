const moment = require('moment');

const today = moment()
const birthday = moment("01/01/1970","DD/MM/YYYY")


const years = today.diff(birthday, 'years');
const daysSinceBirth = today.diff(birthday, 'days')


console.log(today);
console.log(`hoy es ${today.format('DD/MM/YYYY')}`)
console.log(`naci el ${birthday.format('DD/MM/YYYY')}`)
console.log(`nací hace ${years} años`);
console.log(`nací hace ${daysSinceBirth} días`);


