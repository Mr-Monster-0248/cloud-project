import { FastifyPluginAsync } from 'fastify';
import {
  addReview, delReview,
  getReview,
  getReviews,
  putPatchReview
} from '../controllers/reviews.controller';
import { GenericCreatedDTO } from '../dto/generic.dto';
import {
  NewReviewDTO,
  ReviewFromUserOrRestaurantParam,
  ReviewIdParam,
  ReviewResponseDTO,
} from '../dto/review.dto';
import { ErrorResponse } from '../models/ErrorResponse';
import { checkIsAuthenticated } from '../services/auth';
import { RestaurantIdParam } from '../dto/restaurant.dto';
import { UserIdParam } from '../dto/user.dto';
import { checkIsReviewer } from '../services/auth/check-is-reviewer.service';

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
  server.get<{ Params: ReviewFromUserOrRestaurantParam }>(
    '/reviews/:reviewId',
    {
      schema: {
        tags: ['reviews'],
        description: 'Fetch a review by ID',
        params: ReviewFromUserOrRestaurantParam,
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

  // PATCH /reviews/:reviewId
  server.patch<{
    Params: ReviewFromUserOrRestaurantParam;
    Body: Partial<NewReviewDTO>;
  }>(
    '/reviews/:reviewId',
    {
      schema: {
        tags: ['reviews'],
        description: 'Add a new Review',
        params: ReviewFromUserOrRestaurantParam,
        // body: NewReviewDTO, FIXME: flemme
        response: {
          200: GenericCreatedDTO,
          400: ErrorResponse,
        },
      },
      preHandler: [checkIsAuthenticated, checkIsReviewer],
    },
    putPatchReview
  );

  // PATCH /reviews/:reviewId
  server.put<{
    Params: ReviewFromUserOrRestaurantParam;
    Body: NewReviewDTO;
  }>(
    '/reviews/:reviewId',
    {
      schema: {
        tags: ['reviews'],
        description: 'Add a new Review',
        params: ReviewFromUserOrRestaurantParam,
        body: NewReviewDTO,
        response: {
          200: GenericCreatedDTO,
          400: ErrorResponse,
        },
      },
      preHandler: [checkIsAuthenticated, checkIsReviewer],
    },
    putPatchReview
  );

  // PATCH /reviews/:reviewId
  server.delete<{
    Params: ReviewFromUserOrRestaurantParam;
  }>(
    '/reviews/:reviewId',
    {
      schema: {
        tags: ['reviews'],
        description: 'Add a new Review',
        params: ReviewFromUserOrRestaurantParam,
        response: {
          200: GenericCreatedDTO,
          400: ErrorResponse,
        },
      },
      preHandler: [checkIsAuthenticated, checkIsReviewer],
    },
    delReview
  );
};
