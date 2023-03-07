import got from 'got';

const url = 'http://localhost:8080/egreso';

const getNumbers = () => {
    got(url, { responseType: 'json' })
        .then(response => console.log(response.body))
        .catch(error => console.log(error))
}

setInterval(getNumbers, 10000);

getNumbers();
