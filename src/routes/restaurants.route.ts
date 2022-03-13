import { FastifyPluginAsync } from 'fastify';
import {
  addRestaurantHandler, deleteRestaurantHandler,
  getRestaurantHandler,
  getRestaurantsHandler,
  putPatchRestaurant
} from '../controllers/restaurants.controller';
import { GenericCreatedDTO } from '../dto/generic.dto';
import {
  NewRestaurantDTO,
  RestaurantDTO,
  RestaurantIdParam,
  UpdateRestaurantDTO,
} from '../dto/restaurant.dto';
import { ErrorResponse } from '../models/ErrorResponse';
import { checkIsAuthenticated } from '../services/auth';
import { checkIsOwner } from '../services/auth/check-is-owner.service';
import { Type } from '@sinclair/typebox';
import { ReviewsRoute } from './reviews.route';

export const RestaurantsRoute: FastifyPluginAsync = async (server) => {
  // GET /restaurants
  server.get(
    '/restaurants',
    {
      schema: {
        tags: ['restaurants'],
        description: 'List all restaurants',
        response: {
          200: {
            description: 'Success response',
            type: 'array',
            items: RestaurantDTO,
          },
          401: {
            description: 'Unauthorized Access',
            type: 'null',
          },
          403: {
            description: 'Forbidden Access',
            type: 'null',
          },
          404: ErrorResponse,
        },
      },
    },
    getRestaurantsHandler
  );

  // GET /restaurants/:id
  server.get<{ Params: RestaurantIdParam }>(
    '/restaurants/:restaurantId',
    {
      schema: {
        tags: ['restaurants'],
        description: 'List one restaurants',
        params: RestaurantIdParam,
        response: {
          200: RestaurantDTO,
          401: {
            description: 'Unauthorized Access',
            type: 'null',
          },
          403: {
            description: 'Forbidden Access',
            type: 'null',
          },
          404: ErrorResponse,
        },
      },
    },
    getRestaurantHandler
  );

  // POST /restaurants
  server.post<{ Body: NewRestaurantDTO }>(
    '/restaurants',
    {
      schema: {
        tags: ['restaurants'],
        description: 'List one restaurants',
        body: NewRestaurantDTO,
        response: {
          201: GenericCreatedDTO,
          400: ErrorResponse,
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
      preHandler: checkIsAuthenticated,
    },
    addRestaurantHandler
  );

  // PUT /restaurants/:id
  server.put<{ Params: RestaurantIdParam; Body: NewRestaurantDTO }>(
    '/restaurants/:restaurantId',
    {
      schema: {
        tags: ['restaurants'],
        description: 'List one restaurants',
        params: RestaurantIdParam,
        body: NewRestaurantDTO,
        response: {
          200: Type.Null(),
          400: ErrorResponse,
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
      preHandler: [checkIsAuthenticated, checkIsOwner],
    },
    putPatchRestaurant
  );

  // PATCH /restaurants/:id
  server.patch<{ Params: RestaurantIdParam; Body: Partial<NewRestaurantDTO> }>(
    '/restaurants/:restaurantId',
    {
      schema: {
        tags: ['restaurants'],
        description: 'List one restaurants',
        params: RestaurantIdParam,
        body: UpdateRestaurantDTO,
        response: {
          200: Type.Null(),
          400: ErrorResponse,
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
      preHandler: [checkIsAuthenticated, checkIsOwner],
    },
    putPatchRestaurant
  );

  // DELETE /restaurants/:id
  server.delete<{ Params: RestaurantIdParam }>(
    '/restaurants/:restaurantId',
    {
      schema: {
        tags: ['restaurants'],
        description: 'List one restaurants',
        params: RestaurantIdParam,
        response: {
          200: RestaurantDTO,
          404: ErrorResponse,
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
      preHandler: [checkIsAuthenticated, checkIsOwner]
    },
    deleteRestaurantHandler
  );

  // reviews
  server.register(ReviewsRoute, { prefix: '/restaurants/:restaurantId' });
};
