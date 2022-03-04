import { FastifyPluginAsync } from 'fastify';
import {
  addReview,
  getReview,
  getReviews,
} from '../controllers/reviews.controller';
import { GenericCreatedDTO } from '../dto/generic.dto';
import {
  NewReviewDTO,
  ReviewIdParam,
  ReviewResponseDTO,
} from '../dto/review.dto';
import { ErrorResponse } from '../models/ErrorResponse';
import { checkIsAuthenticated } from '../services/auth';
import { RestaurantIdParam } from '../dto/restaurant.dto';
import { UserIdParam } from '../dto/user.dto';

export const ReviewsRoute: FastifyPluginAsync = async (server) => {
  // GET /reviews
  server.get<{ Params: RestaurantIdParam | UserIdParam }>(
    '/reviews',
    {
      schema: {
        tags: ['reviews'],
        description: 'Fetch a review by ID',
        // params: Type.Union([RestaurantIdParam, UserIdParam], {
        //   $id: 'UnionRestaurantUserId',
        // }),
        response: {
          200: {
            description: 'TODO',
            type: 'array',
            items: ReviewResponseDTO,
          },
          404: ErrorResponse,
        },
      },
    },
    getReviews
  );

  // GET /reviews/:reviewId
  server.get<{ Params: ReviewIdParam }>(
    '/reviews/:reviewId',
    {
      schema: {
        tags: ['reviews'],
        description: 'Fetch a review by ID',
        params: ReviewIdParam,
        response: {
          200: ReviewResponseDTO,
          404: ErrorResponse,
        },
      },
    },
    getReview
  );

  // POST /reviews
  server.post<{ Body: NewReviewDTO }>(
    '/reviews',
    {
      schema: {
        tags: ['reviews'],
        description: 'Add a new Review',
        body: NewReviewDTO,
        response: {
          201: GenericCreatedDTO,
          400: ErrorResponse,
        },
      },
      preHandler: checkIsAuthenticated,
    },
    addReview
  );
};
