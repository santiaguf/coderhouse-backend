import PersonasDaoMongo from "./PersonasDaoMongo.js";
import PersonasDaoFile from "./PersonasDaoFile.js";
import PersonasDaoMem from "./PersonasDaoMem.js";

const rutaArchivo = "./test/personas.txt";
const cnxStr = "mongodb://localhost:27017/personas";

const option = process.argv[2] || "Mem";

let dao

switch (option) {
    case 'Mongo':
        dao = new PersonasDaoMongo(cnxStr);
        await dao.init();
        break;
    case 'File':
        dao = new PersonasDaoFile(rutaArchivo);
        await dao.init();
        break;
    default:
        dao = new PersonasDaoMem();
        break;
}

export default class PersonasDaoFactory {
    static getDao() {
        return dao;
    }
}
