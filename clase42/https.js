import { request } from 'https';
import { writeFile } from 'fs';

const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/posts',
    method: 'GET'
}

const req = request(options, (res) => {
    let response = '';

    res.on('data', d => {
        response += d;
    })

    res.on('end', () => {
        const posts = JSON.parse(response);
        const file = 'postsHttps.json';
        writeFile(file, JSON.stringify(posts, null, '\t'), (err) => {
            if (err) throw new Error('No se pudo escribir el archivo', err);
            console.log(`Archivo ${file} creado`);
        })
    })

})

req.on('error', (error) => {
    console.error(error);
})

req.end();