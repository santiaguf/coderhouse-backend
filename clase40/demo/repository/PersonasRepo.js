import Persona from '../model/Persona.js'
import PersonasDaoFactory from '../dao/PersonasDaoFactory.js'
import { asDto } from '../dto/PersonaDTO.js'

export default class PersonasRepo {
    #dao

    constructor() {
        this.#dao = PersonasDaoFactory.getDao()
    }

    async getAll() {
        const personas = await this.#dao.getAll()
        return personas.map(p => new Persona(p))
    }

    async getById(idBuscado) {
        const dto = await this.#dao.getById(idBuscado)
        return new Persona(dto)
    }

    async add(personaNueva) {
        await this.#dao.save(asDto(personaNueva))
    }

    async removeById(idBuscado) {
        const removida = await this.#dao.deleteById(idBuscado)
        return new Persona(removida)
    }

    async removeAll() {
        await this.#dao.deleteAll()
    }
}
