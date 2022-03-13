import { SwaggerOptions } from 'fastify-swagger';

export const swaggerConfig: SwaggerOptions = {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Node project API',
      version: '0.0.1',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: 'restaurants',
        description: "All the restaurants' related endpoints",
      },
      {
        name: 'reviews',
        description: "All the reviews' related endpoints",
      },
      {
        name: 'users',
        description: "All the users' related endpoints",
      },
      {
        name: 'auth',
        description: "All the authentication\'s related endpoints",
      },
    ],
  },
};
