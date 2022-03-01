import { fastify } from './configs/server.config';
import fastifySwagger from 'fastify-swagger';
import { createConnection, getConnectionOptions } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { swaggerConfig } from './configs';
import { RestaurantsRoute } from './routes/restaurants';

dotenv.config();

fastify.register(fastifySwagger, swaggerConfig);
fastify.register(RestaurantsRoute);

const start = async () => {
  try {
    // Setting up DB connection
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);
    fastify.log.info('Database connected: ' + connection.name);

    await fastify.listen(process.env.PORT || 7000);
    fastify.log.info('Server started successfully');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
