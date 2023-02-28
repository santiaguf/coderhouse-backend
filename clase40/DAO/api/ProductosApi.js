import ProductosDaoDB from '../dao/ProductosDaoDb.js';

export default class ProductosApi {

    constructor() {
        this.productosDao = new ProductosDaoDB();
    }

    async agregar(prodParaAgregar) {
        try {
            const prodAgregado = await this.productosDao.add(prodParaAgregar);
            return prodAgregado;
        } catch (error) {
            console.log(error);
        }

    }

    async buscar(id) {
        let productos;
        if (id) {
            productos = await this.productosDao.getById(id);
        } else {
            productos = await this.productosDao.getAll();
        }
        return productos;
    }

    async borrar(id) {
        if (id) {
            await this.productosDao.deleteById(id);
        }
        else {
            await this.productosDao.deleteAll();
        }
    }

    async reemplazar(id, prodParaReemplazar) {
        const prodReemplazado = await this.productosDao.updateById(id, prodParaReemplazar);
        return prodReemplazado;
    }

    exit() {
        this.productosDao.exit();
    }
}
