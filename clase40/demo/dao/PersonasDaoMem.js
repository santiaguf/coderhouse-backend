export default class PersonasDaoMem {
    constructor() {
        this.personas = []
    }

    init() {
        console.log('Inicializando el DAO de personas en memoria');
    }

    disconnect() {
        console.log('finalinzado el DAO de personas en memoria')
    }

    #getIndex(id) {
        return this.personas.findIndex(p => p.id === id)
    }

    getAll() {
        return this.personas
    }

    getById(id) {
        return this.personas[ this.#getIndex(id)];
    }

    save(persona) {
        this.personas.push(persona)
        return persona
    }

    deleteById(id) {
        const [ deletedPerson ] = this.personas.splice(this.#getIndex(id), 1)
        return deletedPerson
    }

    deleteAll() {
        this.personas = []
    }

    updateById(id, persona) {
        const index = this.#getIndex(id)
        const updatedPerson = { ...this.personas[index], ...persona }
        this.personas.splice(index, 1, updatedPerson)
        return updatedPerson
    }
}