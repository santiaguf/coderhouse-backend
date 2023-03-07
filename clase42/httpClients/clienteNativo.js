import { request } from 'http';

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}

const req = request(options, res => {
    let response = '';

    res.on('data', d => response += d)
    res.on('end', () => console.log(JSON.parse(response)) )
})

req.on('error', error => {
    console.error(error)
})

req.end()