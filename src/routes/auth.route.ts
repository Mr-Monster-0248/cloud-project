import { FastifyPluginAsync } from 'fastify';
import { loginUser } from '../controllers/auth.controller';
import { AuthDto, AuthResponseDto } from '../dto/auth.dto';

export const AuthRoute: FastifyPluginAsync = async (server) => {
  server.post(
    '/auth/login',
    {
      schema: {
        description: 'List all restaurants',
        body: AuthDto,
        response: {
          200: AuthResponseDto,
          // TODO: add 403 error,
        },
      },
    },
    loginUser
  );
};
