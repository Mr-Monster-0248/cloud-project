import { Static, Type } from '@sinclair/typebox'; // package advised by Fastify
import { ReviewBaseDTO } from './base/review-base.dto';

// TODO: change descriptions

export const UserDTO = Type.Object(
  {
    userId: Type.Integer(),
    username: Type.String(),
    reviews: Type.Optional(Type.Ref(ReviewBaseDTO)),
  },
  { description: 'User model', $id: 'UserDTO' }
);

export const UserIdParam = Type.Object({ userId: Type.Integer() });

export type UserDTO = Static<typeof UserDTO>;
export type UserIdParam = Static<typeof UserIdParam>;
