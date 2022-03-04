import { fastify } from '../src/index';
import {
  createConnection,
  getConnectionOptions,
  getConnection,
} from 'typeorm';
import { Restaurant } from '../src/entities/Restaurant';
import { Review } from '../src/entities/Review';
import { User } from '../src/entities/User';

beforeAll(async () => {
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    entities: [User, Review, Restaurant],
  });

  await fastify.ready();
});

afterAll(async () => {
  await getConnection().close();
  await fastify.close();
});

export { fastify };
