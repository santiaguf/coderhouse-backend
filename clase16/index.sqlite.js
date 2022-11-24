import ClienteSql from './model/sql.js';
import { config } from './config/sqlite3.js';


const sql = new ClienteSql(config);

// punto 1
sql.createTable()
  .then(() => {
    console.log('1. Tabla creada');

    // punto 2
    const articulos = [
      { nombre: 'Escuadra', codigo: 'C1', precio: 123.45, stock: 10 },
      { nombre: 'Calculadora', codigo: 'C2', precio: 234.56, stock: 5 },
      { nombre: 'Globo Terráqueo', codigo: 'C3', precio: 345.67, stock: 5 },
      { nombre: 'camiseta CR7', codigo: 'CR7ManUtd', precio: 100, stock: 2},
      { nombre: 'camiseta Messi', codigo: 'MessiFCB', precio: 100, stock: 2},
    ]
    return sql.insertArticles(articulos)
  })
  .then(() => {
    console.log('2. Articulos insertados');

    // punto 3
    return sql.getArticles()
  })
  .then(articulos => {
    console.log('3. Articulos obtenidos');
    console.table(articulos);

    // punto 4
    return sql.deleteArticle(3)
  })
  .then(() => {
    console.log('4. Articulo eliminado');

    // punto 5
    return sql.updateArticleStock(2, 0)
  })
  .then(() => {
    console.log('5. Stock actualizado');

    // punto 6
    return sql.getArticles()
  })
  .then(articulos => {
    console.log('6. Articulos obtenidos');
    console.table(articulos);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    sql.close();
  });