import { Type, Static } from '@sinclair/typebox';



export const AuthDto = Type.Object(
  {
    username: Type.String(),
    password: Type.String(),
  },
  { description: 'User authentication DTO', $id: 'AuthDto' }
);

export type AuthDto = Static<typeof AuthDto>;

export const AuthResponseDto = Type.Object(
  {
    token: Type.String(),
  },
  { description: 'User authentication token response', $id: 'AuthResponseDto' }
);

export type AuthResponseDto = Static<typeof AuthResponseDto>;
