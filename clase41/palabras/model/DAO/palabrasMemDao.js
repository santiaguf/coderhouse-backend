import palabraDTO from "../DTO/palabraDto.js";
import PalabrasBaseDAO from "./palabrasBaseDao.js";

class PalabrasMemDAO extends PalabrasBaseDAO {
    constructor() {
        super();
        this.palabras = [];
    }

    obtenerPalabras = async () => {
        try {
            return this.palabras;
        }
        catch (error) {
            console.log(`Error en obtenerPalabras  ${error}`);
            return [];
        }
    }

    guardarPalabra = async palabra => {
        try {
            let _id = this.getNext_Id(this.palabras);
            let timestamp = Date.now();
            let palabraGuardada = palabraDTO(palabra, _id, timestamp);
            this.palabras.push(palabraGuardada);

            return palabraGuardada;

        } catch (error) {
            console.log(`Error en guardarPalabra  ${error}`);
            let palabra = {};
            return palabra;
        }
    }
}

export default PalabrasMemDAO;