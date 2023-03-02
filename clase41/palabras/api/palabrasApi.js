import PalabrasFactoryDAO from '../model/DAO/palabrasFactoryDao.js'
import Palabras from '../model/palabrasModel.js'

class PalabrasApi {
    constructor() {
        this.PalabrasDAO = PalabrasFactoryDAO.get();
    }

    async obtenerPalabras() {
        let palabras = await this.PalabrasDAO.obtenerPalabras();
        return palabras.map(p => p.palabra).join(' ');
    }

    async guardarPalabra(palabra) {
        PalabrasApi.asegurarPalabraValida(palabra, true)
            return await this.PalabrasDAO.guardarPalabra(palabra);
    }

    static asegurarPalabraValida(palabra, requerido) {
        try {
            Palabras.validar(palabra, requerido);
        } catch (error) {
            throw new Error(`Palabra inválida: ${error.message}`);
        }
    }
}

export default PalabrasApi;