import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  dni: { type: String, required: true },
  curso: { type: String, required: true },
  nota: { type: Number, required: true },
  ingreso: { type: String, default: false },
})

const estudiantesDAO = mongoose.model('estudiantes', estudianteSchema);

// conexión a la base de Datos
await mongoose.connect('mongodb://localhost:27017/colegio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

console.log('Base de datos mongo conectada')

try {
  console.log('\n1) Actualizar el dni del estudiante Lucas Blanco a 20355875')

  let response = await estudiantesDAO.updateOne({
    nombre: 'Lucas',
    apellido: 'Blanco' },
    { $set: { dni: '20355875' } })
    console.log(response)

  console.log(`\n2) Agregar un campo 'ingreso' a todos los documentos con el valor false`)

  response = await estudiantesDAO.updateMany({}, { ingreso: false })
  console.log(response)

  console.log(`\n3) Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A`)
  response = await estudiantesDAO.updateMany({ curso: '1A' }, { ingreso: true })
  console.log(response)

  console.log(`\n4) Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v`)
  response = await estudiantesDAO.find({ nota: { $gte: 4 } }, { _id: 0, __v: 0 })
  response.forEach(estudiante => {
    console.log(JSON.stringify(estudiante))
  })


  console.log(`\n5) Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v`)
  response = await estudiantesDAO.find({ ingreso: true }, { _id: 0, __v: 0 })
  response.forEach(estudiante => {
    console.log(JSON.stringify(estudiante))
  })

  console.log(`\n6) Borrar de la colección de estudiantes, los documentos cuyo campo 'ingreso' esté en true`)
  response = await estudiantesDAO.deleteMany({ ingreso: true })
  console.log(response)

  console.log(`\n7) Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) y su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS`)
  response = await estudiantesDAO.find({}, { __v: 0 })
  response.forEach(estudiante => {
    console.log(JSON.stringify(estudiante), '-> fecha de creación', new Date(estudiante._id.getTimestamp()).toLocaleString())
  })
} catch (err) {
  console.log(`Error en el proceso ${err}`)
} finally {
  await mongoose.disconnect()
}