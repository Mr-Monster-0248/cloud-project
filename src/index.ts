import { fastify } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { serverConfig, swaggerConfig } from './configs';
import { ResaurantRoute } from './routes/restaurants';

const server = fastify(serverConfig);

server.register(fastifySwagger, swaggerConfig);
server.register(ResaurantRoute);

const start = async () => {
  try {
    await server.listen(process.env.PORT || 7000);
    server.log.info('Server started successfully');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
