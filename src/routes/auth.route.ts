import { FastifyPluginAsync } from 'fastify';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { AuthDto, AuthResponseDto } from '../dto/auth.dto';

export const AuthRoute: FastifyPluginAsync = async (server) => {
  server.post(
    '/auth',
    {
      schema: {
        tags: ['auth'],
        description: 'Authenticate the user and return the corresponding token',
        body: AuthDto,
        response: {
          200: AuthResponseDto,
          401: {
            description: 'Unauthorized Access',
            type: 'null',
          },
          403: {
            description: 'Forbidden Access',
            type: 'null',
          },
        },
      },
    },
    loginUser
  );

  server.post(
    '/auth/register',
    {
      schema: {
        tags: ['auth'],
        description: 'Create a new user and return the corresponding token',
        body: AuthDto,
        response: {
          200: AuthResponseDto,
          401: {
            description: 'Unauthorized Access',
            type: 'null',
          },
          403: {
            description: 'Forbidden Access',
            type: 'null',
          },
        },
      },
    },
    registerUser
  );
};
