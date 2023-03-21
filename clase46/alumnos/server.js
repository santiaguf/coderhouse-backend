const Koa = require('koa');
const KoaBody = require('koa-body');

const app = new Koa();

app.use(KoaBody());

const alumnos = require('./alumnos.js');

app.use(alumnos.routes());

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', error => console.log('Server error', error));