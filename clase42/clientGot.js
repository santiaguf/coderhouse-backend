import got from 'got';

let url = 'http://localhost:8080';

got(url, { responseType: 'json' })
    .then(response => console.log(response.body))
    .catch(error => console.log(error))