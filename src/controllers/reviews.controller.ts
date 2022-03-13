import { FastifyReply, FastifyRequest } from 'fastify';
import {
  deleteReview,
  getAllReviews,
  getOneReviewById,
  saveReview,
  updateReview,
} from '../services/database/review-queries.service';
import {
  NewReviewDTO,
  ReviewFromUserOrRestaurantParam,
} from '../dto/review.dto';
import { Review } from '../entities/Review';
import { RestaurantIdParam } from '../dto/restaurant.dto';
import { UserIdParam } from '../dto/user.dto';

export function getReviewsHandler(
  req: FastifyRequest<{
    Params: RestaurantIdParam | UserIdParam;
  }>,
  res: FastifyReply
) {
  getAllReviews(req.params)
    .then((reviews) => {
      res.code(200).send(reviews);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(500).send(new Error('Something went wrong'));
    });
}

export function getOneReviewHandler(
  req: FastifyRequest<{
    Params: ReviewFromUserOrRestaurantParam;
  }>,
  res: FastifyReply
) {
  getOneReviewById(req.params.reviewId, { ...req.params })
    .then((review) => {
      res.code(200).send(review);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Review not found'));
    });
}

export function addReviewHandler(
  req: FastifyRequest<{ Body: NewReviewDTO }>,
  res: FastifyReply
) {
  if (req.body.grade > 5 || req.body.grade < 0) {
    res.code(400).send(new Error('Grade has to be between 0 and 5'));
    return;
  }
  const newReview = new Review({
    content: req.body.content,
    grade: req.body.grade,
    reviewerId: req.session.userId,
    restaurantId: req.body.restaurantId,
  });

  saveReview(newReview)
    .then((reviewId) => {
      res.code(201).send({ id: reviewId });
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not create review'));
    });
}

export function putPatchReview(
  req: FastifyRequest<{
    Params: ReviewFromUserOrRestaurantParam;
    Body: NewReviewDTO | Partial<NewReviewDTO>;
  }>,
  res: FastifyReply
) {
  if (req.body.grade && (req.body.grade > 5 || req.body.grade < 0)) {
    res.code(400).send(new Error('Grade has to be between 0 and 5'));
    return;
  }
  const newReview = new Review({
    reviewId: req.params.reviewId,
    content: req.body.content,
    grade: req.body.grade,
    reviewerId: req.session.userId,
    restaurantId: req.body.restaurantId,
  });

  updateReview(newReview)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not create review'));
    });
}

export function deleteReviewHandler(
  req: FastifyRequest<{
    Params: ReviewFromUserOrRestaurantParam;
  }>,
  res: FastifyReply
) {
  deleteReview(req.params.reviewId)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not delete review'));
    });
}
