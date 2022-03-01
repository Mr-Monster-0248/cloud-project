import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify

// TODO: change descriptions

export const UserBaseDTO = Type.Object(
  {
    userId: Type.Integer(),
    username: Type.String(),
  },
  { description: 'User model', $id: 'UserBaseDTO' }
);

export type UserBaseDTO = Static<typeof UserBaseDTO>;
