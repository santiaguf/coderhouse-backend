import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./db/serviceAccountKey.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coderhousesanti.firebaseio.com'
})

console.log('base firebase conectada');

const db = admin.firestore();
const colores = db.collection('colores')


// listar colores
const listColors = async () => {

  const snapshot = await colores.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

//agregar colores

await colores.doc().set({ nombre: 'red'});
await colores.doc().set({ nombre: 'blue'});
await colores.doc().set({ nombre: 'green'});
console.log('colores insertados')

await listColors();

// actualizar a navi uno de los colores
const item = await colores.doc('NfgvNJPinhmgnxHcCock').update({ nombre: 'navy' });
console.log('el color fue actualizado', item);

// borrar un color
const greenToDelete = await colores.doc('oENJzx3oql8gos0s6tB6').delete();
console.log('el color fue borrado', greenToDelete);

await listColors();