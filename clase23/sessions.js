import express from 'express';
import session from 'express-session';

const app = express();

// recuerden que el secret, se debe manejar a traves de variables de entorno
app.use(session({
  secret: 'coder19dic',
  resave: false,
  saveUninitialized: false
}));

const getNombreSession = req => req.query.nombre ? req.session.nombre = req.query.nombre : 'Invitado';

app.get('/', (req, res) => {
  if(req.session.contador){
    req.session.contador++;
    res.send(`Hola ${getNombreSession(req)}! visitaste la pagina ${req.session.contador} veces`);
  } else {
    req.session.contador = 1;
    res.send(`Hola ${getNombreSession(req)}! Te damos la bienvenida`);
  }
});

app.get('/olvidar', (req, res) => {
  req.session.destroy(err => {
    if(err){
      res.json({ error: 'olvidar', body: err })
    } else {
      res.send(`Hasta luego`)
    }
  })
});


const port = 8080;
const server = app.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));