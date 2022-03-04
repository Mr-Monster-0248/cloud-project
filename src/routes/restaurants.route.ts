import { FastifyPluginAsync } from 'fastify';
import {
  addRestaurant,
  getRestaurant,
  getRestaurants,
  putPatchRestaurant,
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
          404: ErrorResponse,
        },
      },
    },
    getRestaurants
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
          404: ErrorResponse,
        },
      },
    },
    getRestaurant
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
        },
      },
      preHandler: checkIsAuthenticated,
    },
    addRestaurant
  );

  // PUT /restaurants
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
        },
      },
      preHandler: [checkIsAuthenticated, checkIsOwner],
    },
    putPatchRestaurant
  );

  // PUT /restaurants
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
        },
      },
      preHandler: [checkIsAuthenticated, checkIsOwner],
    },
    putPatchRestaurant
  );

  // reviews
  server.register(ReviewsRoute, { prefix: '/restaurants/:restaurantId' });
};
