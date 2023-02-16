import { promises as fs } from 'fs';

class FileContainer {
    constructor(filePath) {
        this.path = filePath;
    }

    async list(id) {
        const ops = await this.listAll();
        const filtered = ops.filter(op => op.id === id);
        return filtered;
    }

    async listAll() {
        try {
            const ops = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(ops);
        } catch (error) {
            return [];
        }
    }

    async save(op) {
        const ops = await this.listAll();

        let newId;
        if (ops.length === 0) {
            newId = 1;
        } else {
            newId = ops[ops.length - 1].id + 1;
        }

        const newOp = { ...op, id: newId };
        ops.push(newOp);

        try {
            await fs.writeFile(this.path, JSON.stringify(ops, null, 2));
            return newOp;
        } catch (error) {
            throw new Error(`Error al guardar la operación ${error}`);
        }
    }

    async update(op) {
        const ops = await this.listAll();
        const index = ops.findIndex(o => o.id === op.id);
        if (index === -1) {
            throw new Error(`No existe la operación con id ${op.id}`);
        } else {
            objs[index] = op;
            try {
                await fs.writeFile(this.path, JSON.stringify(ops, null, 2));
            } catch (error) {
                throw new Error(`Error al actualizar la operación ${error}`);
            }
        }
    }

    async delete(id) {
        const ops = await this.listAll();
        const index = ops.findIndex(o => o.id === op.id);
        if (index === -1) {
            throw new Error(`No existe la operación con id ${op.id}`);
        }

        ops.splice(index, 1);
        try {
            await fs.writeFile(this.path, JSON.stringify(ops, null, 2));
        } catch (error) {
            throw new Error(`Error al borrar la operación ${error}`);
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2));
        } catch (error) {
            throw new Error(`Error al borrar todo ${error}`);
        }
    }
}

export default FileContainer;