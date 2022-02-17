import { Type, Static } from '@sinclair/typebox'; // package adviced by Fastify

export const Restaurant = Type.Object(
  {
    name: Type.String(),
    description: Type.String(),
  },
  { description: 'Restaurant model' }
);

export type Restaurant = Static<typeof Restaurant>;
