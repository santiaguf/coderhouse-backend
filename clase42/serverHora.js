import { createServer } from 'http';

const server = createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
        FyH: new Date().toLocaleString()
    }))
})

const port = 8080;

server.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));