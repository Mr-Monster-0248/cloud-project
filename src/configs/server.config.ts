import { FastifyServerOptions } from 'fastify';
import { config } from 'dotenv';
import { checkLogPath } from '../utils/checkLogPath';

config();

const environment = process.env.ENVIRONMENT || 'development';

export const serverConfig: FastifyServerOptions = {
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
};
