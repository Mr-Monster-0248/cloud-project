import { SwaggerOptions } from 'fastify-swagger';

export const swaggerConfig: SwaggerOptions = {
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: {
      title: 'Node project API',
      version: '0.0.1',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};
