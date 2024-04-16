import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Hyva: A RealTime IDE - API Documentation',
    },
  },
  apis: ['./src/routes/index.ts'],
};

export const swaggerSpecs = swaggerJsDoc(options);
