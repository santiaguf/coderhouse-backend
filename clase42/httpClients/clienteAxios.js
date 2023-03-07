import axios from 'axios';

let url = 'http://localhost:8080';

axios(url)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))