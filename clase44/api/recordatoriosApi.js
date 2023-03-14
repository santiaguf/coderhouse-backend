import RecordatorioDAO from "../dao/recordatorioDAO.js";
import Recordatorio from "../model/recordatorio.model.js";
import crypto from "crypto";

export default class RecordatorioApi {
    constructor() {
        this.recordatorioDAO = new RecordatorioDAO();
    }

    getRecordatorios = () => {
        return this.recordatorioDAO.getRecordatorios();
    }

    createRecordatorio = ({ datos }) => {
        const id = crypto.randomBytes(10).toString("hex");
        const nuevoRecordatorio = new Recordatorio(id, datos);

        this.recordatorioDAO.saveRecordatorio(nuevoRecordatorio);
        return nuevoRecordatorio;
    }

    markAsReadRecordatorio = ({ id }) => {
        const updatedRecordatorio = this.recordatorioDAO.updateRecordatorio(id, { leido: true });
        return updatedRecordatorio;
    }

    deleteReadRecordatorios = () => {
        const deletedRecordatorios = this.recordatorioDAO.deleteRecordatorioWhere("leido", true);
        return deletedRecordatorios;
    }

}