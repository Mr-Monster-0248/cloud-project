import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify

export const GenericCreatedDTO = Type.Object(
  {
    id: Type.Integer(),
  },
  { description: 'Model form newly created objects', $id: 'GenericCreatedDTO' }
);

export type GenericCreatedDTO = Static<typeof GenericCreatedDTO>;
