import { FastifyPluginAsync } from 'fastify';
import { addReview, getReview } from '../controllers/reviews.controller';
import { GenericCreatedDTO } from '../dto/generic.dto';
import {
  NewReviewDTO,
  ReviewIdParam,
  ReviewResponseDTO,
} from '../dto/review.dto';
import { ErrorResponse } from '../models/ErrorResponse';
import { checkIsAuthenticated } from '../services/auth';

export const ReviewsRoute: FastifyPluginAsync = async (server) => {
  // GET /reviews/:reviewId
  server.get<{ Params: ReviewIdParam }>(
    '/reviews/:reviewId',
    {
      schema: {
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
