import PalabrasMemDAO from "./palabrasMemDao.js";

class PalabrasFactoryDAO {
    static get() {
        return new PalabrasMemDAO();
    }
}

export default PalabrasFactoryDAO;