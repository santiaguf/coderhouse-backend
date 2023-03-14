export default class RecordatorioDAO {
    constructor() {
        this.recordatorios = [];
    }

    getRecordatorios() {
        return this.recordatorios;
    }

    saveRecordatorio(recordatorio) {
        this.recordatorios.push(recordatorio);
    }

    updateRecordatorio(id, campos) {
        console.log(id);
        const index = this.recordatorios.findIndex((r) => r.id === id);
        if (index === -1) {
            throw new Error("No existe el recordatorio");
        }

        const updatedRecordatorio = { ...this.recordatorios[index], ...campos };
        this.recordatorios[index] = updatedRecordatorio;
        console.log(updatedRecordatorio);
        return updatedRecordatorio;
    }

    deleteRecordatorioWhere(campo, valor) {
        let i = 0;
        const deletedRecordatorios = [];
        while (i < this.recordatorios.length) {
            if (this.recordatorios[i][campo] == valor) {
                deletedRecordatorios.push(this.recordatorios.splice(i, 1)[0]);
            } else {
                i++;
            }
        }
        return deletedRecordatorios;
    }

    createRecordatorio({ datos }) {
        const id = crypto.randomBytes(10).toString("hex");
        const nuevoRecordatorio = new Recordatorio(id, datos);

        recordatorios.push(nuevoRecordatorio);
        return nuevoRecordatorio;
    }

    markAsReadRecordatorio({ id }) {
        const recordatorio = recordatorios.find((r) => r.id === id);

        if (!recordatorio) {
            throw new Error("No existe el recordatorio");
        }
        this.recordatorio.leido = true;
        return recordatorio;
    }

}