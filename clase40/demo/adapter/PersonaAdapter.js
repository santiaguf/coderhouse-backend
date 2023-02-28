export default class PersonaAdapter {
    #persona

    constructor(persona) {
        this.persona = persona
    }

    asTextPlain() {
        const line = [];
        /*line.push(this.persona.id);
        line.push(this.persona.nombre);
        line.push(this.persona.apellido);
        line.push(this.persona.DNI);*/
        return line.join('\n');
    }
}