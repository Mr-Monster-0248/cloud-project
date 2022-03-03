import { Type, Static } from '@sinclair/typebox';

// TODO: change descriptions

export const AuthDto = Type.Object(
  {
    username: Type.String(),
    password: Type.String(),
  },
  { description: 'User auth DTO', $id: 'AuthDto' }
);

export type AuthDto = Static<typeof AuthDto>;

export const AuthResponseDto = Type.Object(
  {
    token: Type.String(),
  },
  { description: 'User token', $id: 'AuthResponseDto' }
);

export type AuthResponseDto = Static<typeof AuthResponseDto>;
