import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify

export const UserBaseDTO = Type.Object(
  {
    userId: Type.Integer(),
    username: Type.String(),
  },
  { description: 'Base for the user model using core data', $id: 'UserBaseDTO' }
);

export type UserBaseDTO = Static<typeof UserBaseDTO>;
