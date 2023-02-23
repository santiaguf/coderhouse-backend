import PrimeraConexion from "../models/singleton.model.js";

export function obtenerHora() {
    const instancia = PrimeraConexion.getInstance();
    return instancia.obtenerHora();
}