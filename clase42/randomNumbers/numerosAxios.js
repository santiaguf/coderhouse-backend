import axios from 'axios';

const url = 'http://localhost:8080/ingreso';

const sendNumbers = () => {
    let randonNumber = Math.random();
    axios.post(url, { number: randonNumber })
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
}

setInterval(sendNumbers, 2000);

sendNumbers();