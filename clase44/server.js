import express from "express";
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
        titulo: String,
        descripcion: String,
        leido: Boolean,
        timestamp: Float
    }
    type Query {
        getRecordatorios: [Recordatorio],
    }
    type Mutation {
        createRecordatorio(datos: RecordatorioInput): Recordatorio,
        markAsReadRecordatorio(id: ID!): Recordatorio,
        deleteReadRecordatorios: [Recordatorio],
    }
`);

class Recordatorio {
    constructor(id, { titulo, descripcion, timestamp }) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.timestamp = timestamp;
        this.leido = false;
    }
}

const recordatorios =[];

function getRecordatorios() {
    return recordatorios;
}

function createRecordatorio({ datos }) {
    const id = crypto.randomBytes(10).toString("hex");
    const nuevoRecordatorio = new Recordatorio(id, datos);

    recordatorios.push(nuevoRecordatorio);
    return nuevoRecordatorio;
}

function markAsReadRecordatorio({ id }) {
    const recordatorio = recordatorios.find((r) => r.id === id);

    if (!recordatorio) {
        throw new Error("No existe el recordatorio");
    }
    recordatorio.leido = true;
    return recordatorio;
}

function deleteReadRecordatorios() {
    let i = 0;
    const deleteReadRecordatorios = [];
    while (i < recordatorios.length) {
        if (recordatorios[i].leido) {
            deleteReadRecordatorios.push(recordatorios.splice(i, 1)[0]);
        } else {
            i++;
        }
    }
    return deleteReadRecordatorios;
}

const app = express();

app.use(express.static("public"));


app.use('/graphql', graphqlHTTP({
    schema: recordatorioSchema,
    rootValue: {
        getRecordatorios,
        createRecordatorio,
        markAsReadRecordatorio,
        deleteReadRecordatorios,
    },
    graphiql: true,
}));


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
