/* eslint-disable @typescript-eslint/no-explicit-any */
import Redis, { RedisOptions } from 'ioredis';
import connectRedis from 'connect-redis';
import fastifySession from '@fastify/session';

const redisConfig: RedisOptions = {
  port: (process.env.REDIS_PORT as number | undefined) ?? 6379,
  host: process.env.REDIS_HOST ?? '127.0.0.1',
  password: process.env.REDIS_HOST ?? 'redis_pass',
};

export const redis = new Redis(redisConfig);

const RedisStore = connectRedis(fastifySession as any);

export const sessionOption = {
  store: new RedisStore({
    client: redis,
  }) as any,
  secret: process.env.SESSION_PASS ?? '41afb5b9-cd49-4b54-958b-655092a6f3ec',
};
