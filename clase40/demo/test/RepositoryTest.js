import PersonasRepo from "../repository/PersonasRepo.js"
import Persona from "../model/Persona.js"
import PersonaAdapter from "../adapter/PersonaAdapter.js"


const IdGenerator = {
    id: 1,
    next() { return this.id++ }
}

const personaDao = new PersonasRepo();

console.log('----------------------------------------')
console.log('1) Obtener todas las personas')
show(await personaDao.getAll())

console.log('----------------------------------------')
console.log('2) Incorporar una persona')
const persona1 = { id: IdGenerator.next(), nombre: 'Juan', apellido: 'Perez', DNI: '3055777' }
show(await personaDao.add(persona1))


console.log('----------------------------------------')
console.log('3) Incorporar otra persona')
const persona2 = { id: IdGenerator.next(), nombre: 'Ana', apellido: 'Gomez', DNI: '3055778' }
show(await personaDao.add(persona2))

console.log('----------------------------------------')
console.log('4) Obtener todas las personas')
show(await personaDao.getAll())

console.log('----------------------------------------')
console.log('5) Obtener una persona por id')
show(await personaDao.getById(persona2.id))

console.log('----------------------------------------')
console.log('7) borrar una persona por id')
show(await personaDao.removeById(persona2.id))

console.log('----------------------------------------')
console.log('8) Obtener todas las personas')
show(await personaDao.getAll())

console.log('----------------------------------------')
console.log('9) borrar todas las personas')
await personaDao.deleteAll()

console.log('----------------------------------------')
console.log('10) Obtener todas las personas')
show(await personaDao.getAll())

function show(data) {
    if (Array.isArray(data)) {
        if (data.length > 0) {

            for (const persona of data) {
                console.log(new PersonaAdapter(persona).asTextPlain())
            }
        } else {
            console.log('no hay datos para mostrar')
        }
    } else {
        console.log(new PersonaAdapter(data).asTextPlain())
    }
}