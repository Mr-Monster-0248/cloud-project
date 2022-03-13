import { Static, Type } from '@sinclair/typebox'; // package advised by Fastify
import { ReviewBaseDTO } from './base/review-base.dto';

/**
 * Main User DTO schema
 * it represents a JSON schema and a typescript type
 */
export const UserDTO = Type.Object(
  {
    userId: Type.Integer(),
    username: Type.String(),
    reviews: Type.Optional(Type.Array(Type.Ref(ReviewBaseDTO))),
  },
  { description: 'User model', $id: 'UserDTO' }
);

export type UserDTO = Static<typeof UserDTO>;

/**
 * User ID when used as a param
 */
export const UserIdParam = Type.Object({ userId: Type.Integer() });
export type UserIdParam = Static<typeof UserIdParam>;

/**
 * User Update DTO
 */
export const UpdateUserDTO = Type.Object({
  username: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),
});

export type UpdateUserDTO = Static<typeof UpdateUserDTO>;
