import { FastifyPluginAsync } from 'fastify';
import { ErrorResponse } from '../models/ErrorResponse';
import { checkIsAuthenticated } from '../services/auth';
import { Type } from '@sinclair/typebox';
import { ReviewsRoute } from './reviews.route';
import {
  deleteUserHandler,
  getOneUserHandler,
  getUsersHandler,
  patchUserHandler,
} from '../controllers/users.controller';
import { UpdateUserDTO, UserDTO, UserIdParam } from '../dto/user.dto';
import { checkIsSelf } from '../services/auth/check-is-self.service';

export const UsersRoute: FastifyPluginAsync = async (server) => {
  // GET /users
  server.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'List all users',
        response: {
          200: {
            description: 'Success response',
            type: 'array',
            items: UserDTO,
          },
          404: ErrorResponse,
        },
      },
    },
    getUsersHandler
  );

  // GET /users/:id
  server.get<{ Params: UserIdParam }>(
    '/users/:userId',
    {
      schema: {
        tags: ['users'],
        description: 'List one users',
        params: UserIdParam,
        response: {
          200: UserDTO,
          404: ErrorResponse,
        },
      },
    },
    getOneUserHandler
  );

  // PATCH /users/:id
  server.patch<{ Params: UserIdParam; Body: UpdateUserDTO }>(
    '/users/:userId',
    {
      schema: {
        tags: ['users'],
        description: 'Used to change the password or the username one users',
        params: UserIdParam,
        body: UpdateUserDTO,
        response: {
          200: Type.Null(),
          400: ErrorResponse,
        },
      },
      preHandler: [checkIsAuthenticated, checkIsSelf],
    },
    patchUserHandler
  );

  // DELETE /users/:id
  server.delete<{ Params: UserIdParam }>(
    '/users/:userId',
    {
      schema: {
        tags: ['users'],
        description: 'Delete one user',
        params: UserIdParam,
        response: {
          200: Type.Null(),
          404: ErrorResponse,
        },
      },
      preHandler: [checkIsAuthenticated, checkIsSelf],
    },
    deleteUserHandler
  );

  // reviews
  server.register(ReviewsRoute, { prefix: '/users/:userId' });
};
