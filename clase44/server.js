import express  from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";

const recordatorioSchema = buildSchema(`
    input RecordatorioInput {
        titulo: String,
        descripcion: String,
        timestamp: Float,
    }
    type Recordatorio {
        id: ID!
        titulo: String
        descripcion: String
        timestamp: Float
    }
    type Query {
        getRecordatorios: [Recordatorio],
    }
    type Mutation {
        createRecordatorio(datos: RecordatorioInput): Recordatorio
    }
`);

class Recordatorio {
    constructor(id, { titulo, descripcion, timestamp }) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.timestamp = timestamp;
    }
}

const Recordatorios =[];

function getRecordatorios() {
    return Recordatorios;
}

function createRecordatorio({ datos }) {
    const id = crypto.randomBytes(10).toString("hex");
    const nuevoRecordatorio = new Recordatorio(id, datos);

    Recordatorios.push(nuevoRecordatorio);
    return nuevoRecordatorio;
}

const app = express();

app.use(express.static("public"));


app.use('/graphql', graphqlHTTP({
    schema: recordatorioSchema,
    rootValue: {
        getRecordatorios,
        createRecordatorio,
    },
    graphiql: false,
}));


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
