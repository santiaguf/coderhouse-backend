import { Schema, model, connect, disconnect } from 'mongoose';

// definición de esquema
const estudianteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  dni: { type: String, required: true },
  curso: { type: String, required: true },
  nota: { type: Number, required: true },
})

const EstudiantesDAO = model('estudiantes', estudianteSchema);

// conexión a la base de Datos
connect('mongodb://localhost:27017/colegio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('\nBase de datos mongo conectada')

    console.log('\n1. Estudiantes Ordenados por orden alfabético según sus nombres')

    EstudiantesDAO.find({}).sort({ nombre: 1})
    .then(estudiantes => {
      estudiantes.forEach(estudiante => {
        console.log(JSON.stringify(estudiante))
      })

      console.log('\n2. El estudiante más joven')

      return EstudiantesDAO.find({}).sort({ edad: 1}).limit(1)
    })
    .then(estudiantes => {
      estudiantes.forEach(estudiante => {
        console.log(JSON.stringify(estudiante))
      })

      console.log('\n3. Los estudiantes del curso 2A ')
      return EstudiantesDAO.find({ curso: '2A'})
    })
    .then(estudiantes => {
      estudiantes.forEach(estudiante => {
        console.log(JSON.stringify(estudiante))
      })

      console.log('\n4. EL segundo estudiante más joven')
      return EstudiantesDAO.find({}).sort({ edad: 1}).skip(1).limit(1)
    })
    .then(estudiantes => {
      estudiantes.forEach(estudiante => {
        console.log(JSON.stringify(estudiante))
      })

      console.log('\n5. Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a la a)')
      return EstudiantesDAO.find({}, { nombre: 1, apellido: 1, curso: 1, _id: 0}).sort({ apellido: -1})
    })
    .then(estudiantes => {
      estudiantes.forEach(estudiante => {
        console.log(JSON.stringify(estudiante))
      })

      console.log('\n6. Los estudiantes que sacaron 10 en la nota')
      return EstudiantesDAO.find({ nota: 10})
    })
    .then(estudiantes => {
      estudiantes.forEach(estudiante => {
        console.log(JSON.stringify(estudiante))
      })

      console.log('\n7. El promedio de notas del total de alumnos')
      return EstudiantesDAO.find({})
    })
    .then(estudiantes => {
      let sumatoria = 0
      estudiantes.forEach(estudiante => {
        sumatoria += estudiante.nota
      })
      const promedio = sumatoria / estudiantes.length;
      console.log(`\nel promedio es: ${promedio}`)

      console.log('\n8. El promedio de notas de los alumnos del curso 1A')
      return EstudiantesDAO.find({ curso: '1A'})
    })
    .then(estudiantes => {
      let sumatoria = 0
      estudiantes.forEach(estudiante => {
        sumatoria += estudiante.nota
      })
      const promedio = sumatoria / estudiantes.length;
      console.log(`\nel promedio es: ${promedio}`)

    })
    .catch(err => { throw new Error(`Error en la lectura de estudiantes ${err}`)
    })
    .finally(() => {
      disconnect().catch(err => {
        throw new Error(`Error al desconectar de la base de datos ${err}`)
      })
    })
  })
