import { fastify } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { createConnection, getConnectionOptions } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { serverConfig, swaggerConfig } from './configs';
import { RestaurantsRoute } from './routes/restaurants';

dotenv.config();

const server = fastify(serverConfig);

server.register(fastifySwagger, swaggerConfig);
server.register(RestaurantsRoute);


const start = async () => {
  try {
    // Setting up DB connection
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);
    server.log.info('Database connected: ' + connection.name);

    await server.listen(process.env.PORT || 7000);
    server.log.info('Server started successfully');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
