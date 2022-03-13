import 'fastify';

declare module 'fastify' {
  interface Session {
    token: string;
    userId: number;
  }
}
