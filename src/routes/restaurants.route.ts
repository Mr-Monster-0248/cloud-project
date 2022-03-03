import { FastifyPluginAsync } from 'fastify';
import {
  addRestaurant,
  getRestaurant,
  getRestaurants,
} from '../controllers/restaurants.controller';
import { NewRestaurantDTO, RestaurantDTO } from '../dto/restaurant.dto';
import { ErrorResponse } from '../models/ErrorResponse';
import { checkIsAuthenticated } from '../services/auth';

export const RestaurantsRoute: FastifyPluginAsync = async (server) => {
  // GET /restaurants
  server.get(
    '/restaurants',
    {
      schema: {
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
  server.get<{ Params: { id: number } }>(
    '/restaurants/:id',
    {
      schema: {
        description: 'List one restaurants',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'restaurant id',
            },
          },
        },
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
        description: 'List one restaurants',
        body: NewRestaurantDTO,
        response: {
          200: RestaurantDTO,
          400: ErrorResponse,
        },
      },
      preHandler: checkIsAuthenticated,
    },
    addRestaurant
  );
};
