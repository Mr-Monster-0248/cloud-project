import { fastify } from '../src/index';
import {
  createConnection,
  getConnectionOptions,
  getConnection,
} from 'typeorm';
import { Restaurant } from '../src/entities/Restaurant';
import { Review } from '../src/entities/Review';
import { User } from '../src/entities/User';

// Pre-testing setup
beforeAll(async () => {
  // Create DB connection
  const connectionOptions = await getConnectionOptions();
  await createConnection({
    ...connectionOptions,
    entities: [User, Review, Restaurant],
  });

  // Fire up server
  await fastify.ready();
});

// Pre-test setup
beforeEach(() => { /**/ });

// Post-testing actions
afterAll(async () => {
  // Close DB connection
  await getConnection().close();

  // Shutdown server
  await fastify.close();
});

export { fastify };
