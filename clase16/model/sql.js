import knexLib from 'knex';

class ClienteSql {

  constructor(config) {
    this.knex = knexLib(config);
  }

  createTable() {
    return this.knex.schema.dropTableIfExists('articulos')
    .finally(() => {
      return this.knex.schema.createTable('articulos', table => {
        table.increments('id_articulo').primary();
        table.string('nombre', 50).notNullable();
        table.string('codigo', 10).notNullable();
        table.float('precio');
        table.integer('stock');
      })
    })
  }

  insertArticles(articles) {
    return this.knex('articulos').insert(articles);
  }

  getArticles() {
    return this.knex('articulos').select('*');
  }

  getArticleById(id) {
    return this.knex('articulos').select('*').where('id_articulo', id);
  }

  updateArticle(id, article) {
    return this.knex('articulos').where('id_articulo', id).update(article);
  }

  deleteArticle(id) {
    return this.knex('articulos').where('id_articulo', id).del();
  }

  updateArticleStock(id, newStock) {
    return this.knex('articulos').where('id_articulo', id).update({ stock: newStock });
  }

  close() {
    return this.knex.destroy();
  }

}

export default ClienteSql;