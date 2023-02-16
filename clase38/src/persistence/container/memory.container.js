class MemoryContainer {
    constructor() {
        this.data = [];
    }

    list(id) {
        const filtered = this.data.filter(op => op.id === id);
        if(!filtered) {
            throw new Error(`No se encontró la operación: ${id}`);
        } else {
        return filtered;
        }
    }

    listAll() {
        return [...this.data];
    }

    save(op) {
        let newId;
        if (ops.length === 0) {
            newId = 1;
        } else {
            newId = ops[ops.length - 1].id + 1;
        }

        const newOp = { ...op, id: newId };
        ops.push(newOp);
        return newOp;
    }

    update(op) {
        const index = ops.findIndex(o => o.id === op.id);
        if (index === -1) {
            throw new Error(`No existe la operación con id ${op.id}`);
        } else {
            objs[index] = op;
            return op;
        }
    }

    delete(id) {
        const index = ops.findIndex(o => o.id === op.id);
        if (index === -1) {
            throw new Error(`No existe la operación con id ${op.id}`);
        } else {
            const deleted = this.data.splice(index, 1);
            return `Se eliminó la operación: ${deleted}`;
        }
    }

    deleteAll() {
        this.data = [];
        return 'Se eliminaron todas las operaciones';
    }
}

export default MemoryContainer;