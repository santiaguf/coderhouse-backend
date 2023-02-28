export default class PersonasDto {
    constructor({ id, nombre, apellido, dni }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}

export function asDto(persona){
    if(Array.isArray(persona)){
        return persona.map(persona => new PersonasDto(persona))
    } else {
        return new PersonasDto(persona)
    }
}