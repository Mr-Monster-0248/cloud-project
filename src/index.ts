import { fastify } from 'fastify';
import { config } from 'dotenv';

config();

const Port = process.env.PORT || 7000;
const environment = process.env.ENVIRONMENT || 'development';
// const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/blogs";

const server = fastify({
  logger: {
    level: 'info',
    file: environment === 'development' ? undefined : './logs/server.log',
    prettyPrint:
      environment === 'development'
        ? {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          }
        : false,
  },
});

// register plugin below:

const start = async () => {
  try {
    await server.listen(Port);
    console.log('Server started successfully');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
