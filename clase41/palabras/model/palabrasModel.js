import Joi from 'joi';

class Palabras {
    constructor(palabra) {
        this.palabra = palabra;
    }

    equals(otroPalabra) {
        if(!(otroPalabra instanceof Palabras)) return false;
        if( this.palabra != otroPalabra.palabra) return false;
        return true;
    }

    static validar(palabra, requerido) {
        const palabraSchema = Joi.object({
            palabra: requerido? Joi.string().required() : Joi.string()
        })

        const { error } = palabraSchema.validate(palabra);
        if(error) throw new Error(error.details[0].message);
    }
}

export default Palabras;