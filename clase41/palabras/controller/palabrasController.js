import PalabrasApi from "../api/palabrasApi.js";

class PalabrasController {
    constructor() {
        this.palabrasApi = new PalabrasApi();
    }

    obtenerPalabras = async (req, res) => {
        try {
            let id = req.params.id;
            let palabras = await this.palabrasApi.obtenerPalabras();

            res.send(palabras);
        }
        catch (error) {
            console.log(`error en obtenerPalabras: ${error.message}`);
        }
    }

    guardarPalabra = async (req, res) => {
        try {
            let palabra = req.body;
            console.log(palabra)
            let palabraGuardada = await this.palabrasApi.guardarPalabra(palabra);

            res.json(palabraGuardada);
        }
        catch (error) {
            console.log(`error en guardarPalabra: ${error.message}`);
        }
    }
}

export default PalabrasController;