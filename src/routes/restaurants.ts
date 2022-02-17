import { FastifyPluginAsync } from 'fastify';
import { getRestaurant, getRestaurants } from '../controllers/restaurants';
import { ErrorResponse } from '../models/ErrorResponse';
import { Restaurant } from '../models/Restaurant';

export const ResaurantRoute: FastifyPluginAsync = async (server) => {
  server.get(
    '/restaurants',
    {
      schema: {
        description: 'List all restaurants',
        response: {
          200: {
            description: 'Success response',
            type: 'array',
            items: Restaurant,
          },
          404: ErrorResponse,
        },
      },
    },
    getRestaurants
  );

  server.get<{ Params: { id: number } }>(
    '/restaurant/:id',
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
          200: Restaurant,
          404: ErrorResponse,
        },
      },
    },
    getRestaurant
  );
};
