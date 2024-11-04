const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Online Store API",
            version: "1.0.0",
            description: "API documentation for an online store"
        },
        servers: [
            { url: "http://localhost:5000" }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key"
                }
            }
        },
        security: [{ ApiKeyAuth: [] }]
    },
    apis: ["./controller/*.js", "./model/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;