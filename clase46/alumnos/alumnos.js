const Router = require('koa-router');

const router = new Router({
    prefix: '/alumnos'
});

const alumnos = [
    { dni: 12345678, nombre: 'Juan Perez', materia: 'Física', nota: 6 },
    { dni: 87654321, nombre: 'Ana Gomez', materia: 'Matemáticas', nota: 8 },
    { dni: 11111111, nombre: 'Pedro Rodriguez', materia: 'Física', nota: 4 },
    { dni: 22222222, nombre: 'Maria Lopez', materia: 'Matemáticas', nota: 10 },
    { dni: 33333333, nombre: 'Jose Martinez', materia: 'Física', nota: 7 }
];

router.get('/', ctx => {
    ctx.body =  { alumnos };
});

router.get('/promedio/:materia', ctx => {
    const materia = ctx.params.materia

    let suma = 0;
    let cant = alumnos
    .filter(alumno => alumno.materia == materia)
    .map(alunmo => (suma += alunmo.nota)).length;
    const promedio = suma / cant;
    ctx.body = {
        promedio: cant ? promedio : `No hay alumnos en la ${materia}`
    }

})

router.get('/:dni', ctx => {
    const alumno = alumnos.filter(a => a.dni == ctx.params.dni);

    if (alumno.length > 0) {
        ctx.body = { alumno: alumno[0] };
    } else {
        ctx.body = { error: 'Alumno no encontrado' };
    }
});

router.post('/new', ctx => {
    if(!ctx.request.body.dni || !ctx.request.body.nombre || !ctx.request.body.materia || !ctx.request.body.nota) {
        ctx.response.status = 400;
        ctx.body = { error: 'Faltan datos' };
        return;
    } else {
        const alumno = {
            dni: ctx.request.body.dni,
            nombre: ctx.request.body.nombre,
            materia: ctx.request.body.materia,
            nota: ctx.request.body.nota
        };
        alumnos.push(alumno);
        ctx.response.status = 201;
        ctx.body = { alumno };
    }
});

router.put('/update/:dni', ctx => {
    const alumno = alumnos.filter(a => a.dni == ctx.params.dni);

    if (alumno.length > 0) {
        if(!ctx.request.body.dni || !ctx.request.body.nombre || !ctx.request.body.materia || !ctx.request.body.nota) {
            ctx.response.status = 400;
            ctx.body = { error: 'Faltan datos' };
            return;
        }

        alumno[0].nombre = ctx.request.body.nombre;
        alumno[0].materia = ctx.request.body.materia;
        alumno[0].nota = ctx.request.body.nota;
        ctx.response.status = 201;
        ctx.body = { alumno: alumno[0] };
    } else {
        ctx.response.status = 404;
        ctx.body = { error: 'Alumno no encontrado' };
    }
});

router.delete('/delete/:dni', ctx => {
    const alumno = alumnos.filter(a => a.dni == ctx.params.dni);

    if (alumno.length > 0) {
        alumnos.splice(alumnos.indexOf(alumno[0]), 1);
        ctx.response.status = 200;
        ctx.body = { alumno: alumno[0] };
    } else {
        ctx.response.status = 404;
        ctx.body = { error: 'Alumno no encontrado' };
    }
});

module.exports = router;