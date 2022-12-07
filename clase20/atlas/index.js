import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: {
    type: String, unique: true
  }
})

const usuarioModel = mongoose.model('usuarios', usuarioSchema);

const connectionStringUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/ecommerce?retryWrites=true&w=majority`;

try {
  await mongoose.connect(connectionStringUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Base de datos conectada');


  try {
    const newUser = new usuarioModel({ nombre: 'federico', apellido: 'Perez', dni: '320118321'})
    await newUser.save()
    console.log('Usuario guardado')

    let usuarios = await usuarioModel.find({})
    usuarios.forEach(usuario => {
      console.log(JSON.stringify(usuario))
    })

  } catch (err) {
    console.log('Error al guardar', err)
  }

}
catch (error) {
  console.log('Error al conectar a la base de datos', error)
}