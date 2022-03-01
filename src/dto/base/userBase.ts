import { Type, Static } from '@sinclair/typebox'; // package adviced by Fastify

export const userBase = Type.Object(
  {
    userId: Type.Integer(),
    username: Type.String(),
  },
  { description: 'User model', $id: 'userBase' }
);

export type userBase = Static<typeof userBase>;
