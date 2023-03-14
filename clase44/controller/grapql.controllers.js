import RecordatorioApi from "../api/recordatoriosApi.js";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

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

export default class GraphQLController {
    constructor() {
        const api = new RecordatorioApi();
        return graphqlHTTP({
            schema: recordatorioSchema,
            rootValue: {
                getRecordatorios: api.getRecordatorios,
                createRecordatorio: api.createRecordatorio,
                markAsReadRecordatorio: api.markAsReadRecordatorio,
                deleteReadRecordatorios: api.deleteReadRecordatorios,
            },
            graphiql: true,
        })
    }
}