let instancia = null;

export default class PrimeraConexion {
    constructor() {
        this.hora = new Date().toLocaleString();
    }

    //método estático que garantiza que sólo haya una instancia de la clase
    static getInstance() {
        if (!instancia) {
            instancia = new PrimeraConexion();
        }
        return instancia;
    }

    obtenerHora() {
        return this.hora;
    }
}