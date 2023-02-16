import MemoryContainer from "./container/memory.container.js";
import FileContainer from "./container/file.container.js";

const containerMode = process.env.CONTAINER_MODE || 'fs';
let container;

switch (containerMode) {
    case 'fs':
        container = new FileContainer('./src/persistence/operations.json');
        break;
    default:
        container = new MemoryContainer();
}

async function save(obj) {
    return await container.save(obj);
}

async function getAll() {
    return await container.listAll();
}

async function getById(id) {
    return await container.list(id);
}

async function update(obj) {
    return await container.update(obj);
}

async function deleteById(id) {
    return await container.delete(id);
}

async function deleteAll() {
    return await container.deleteAll();
}

export {
    save,
    getAll,
    getById,
    update,
    deleteById,
    deleteAll
};