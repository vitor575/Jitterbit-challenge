const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jitterbit Challenge API",
      version: "1.0.0",
      description:
        "API para gerenciamento de Pedidos (Orders) e Itens, desenvolvida para o desafio técnico.",
    },
    servers: [
      {
        url:
          process.env.RENDER_EXTERNAL_URL ||
          "https://jitterbit-challenge.onrender.com",
        description: "Servidor Deployed (Render)",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Caminhos onde estarão os comentários JSDoc com a config do Swagger
  apis: ["./src/routes/*.js", "./src/app.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
