import { FastifyPluginAsync } from 'fastify';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { AuthDto, AuthResponseDto } from '../dto/auth.dto';

export const AuthRoute: FastifyPluginAsync = async (server) => {
  server.post(
    '/auth',
    {
      schema: {
        description: 'Authenticate the user and return the coresponfing token',
        body: AuthDto,
        response: {
          200: AuthResponseDto,
          // TODO: add 403 error,
        },
      },
    },
    loginUser
  );

  server.post(
    '/auth/register',
    {
      schema: {
        description: 'Create a new user and return the coresponfing token',
        body: AuthDto,
        response: {
          200: AuthResponseDto,
          // TODO: add 403 error,
        },
      },
    },
    registerUser
  );
};
