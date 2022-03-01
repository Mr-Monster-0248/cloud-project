import { FastifyServerOptions } from 'fastify';
import fastifyFactory from 'fastify';
import { config } from 'dotenv';
import { checkLogPath } from '../utils/checkLogPath';
import { restaurantBase } from '../dto/base/restaurantBase';
import { reviewBase } from '../dto/base/reviewBase';
import { userBase } from '../dto/base/userBase';
import { restaurantsDto } from '../dto/restaurantsDto';

config();

const environment = process.env.NODE_ENV || 'development';

export const fastify = fastifyFactory({
  logger: {
    level: 'info',
    file: checkLogPath(),
    prettyPrint:
      environment === 'development'
        ? {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          }
        : false,
  },
})
  .addSchema(restaurantBase)
  .addSchema(reviewBase)
  .addSchema(userBase)
  .addSchema(restaurantsDto);
