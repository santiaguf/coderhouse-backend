import { obtenerHora } from "../services/singleton.service.js";

export async function getSingleton(req, res) {
    res.json({ hora: obtenerHora() });
}