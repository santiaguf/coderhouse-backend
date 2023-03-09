const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de productos',
            version: '1.0',
            description: 'API de productos para el curso de Node.js',
        },
    },
    apis: ['./docs/**/*.yaml'],
};

const swaggerSpecs = swaggerJSDoc(options);

module.exports = { swaggerSpecs };