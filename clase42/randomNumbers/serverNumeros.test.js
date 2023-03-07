import { strictEqual, deepStrictEqual } from 'assert';

import axios from 'axios';

const url = 'http://localhost:8080/';

const sendNumber = number => axios.post(url +'ingreso', { number });
const getNumbers = () => axios(url +'egreso');

describe('comprobando que el servidor fuincione correctamente', function () {
    
    /*
    before(function() {
        console.log('*** comienzo del test ***')
    })

    after(function() {
        console.log('*** fin del test ***')
    })

    beforeEach(function() {
        console.log('*** comienzo de una prueba ***')
    })

    afterEach(function() {
        console.log('*** fin de una prueba ***')
    }) */

    it('deberia devolver un array vacio', async function () {
        const { data } = await getNumbers();
        strictEqual(data.numbers.length, 0);
    });



    it('deberia guardar y luego recibir 10 números consecutivos', async function () {
        for (let i = 0; i < 10; i++) {
            await sendNumber(i);
        }

        const { data } = await getNumbers();

        strictEqual(data.numbers.length, 10);
        deepStrictEqual(data.numbers, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    })
})
