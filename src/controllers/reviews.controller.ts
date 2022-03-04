import { RouteHandler } from 'fastify';
import {
  getAllReviews,
  getOneReviewById,
  saveReview,
} from '../services/database/review-queries.service';
import { NewReviewDTO, ReviewIdParam } from '../dto/review.dto';
import { Review } from '../entities/Review';
import { RestaurantIdParam } from '../dto/restaurant.dto';
import { UserIdParam } from '../dto/user.dto';

export const getReviews: RouteHandler<{
  Params: RestaurantIdParam | UserIdParam;
}> = (req, res) => {
  getAllReviews(req.params)
    .then((reviews) => {
      res.code(200).send(reviews);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(500).send(new Error('Something went wrong'));
    });
};

export const getReview: RouteHandler<{ Params: ReviewIdParam }> = (
  req,
  res
) => {
  getOneReviewById(req.params.reviewId)
    .then((review) => {
      res.code(200).send(review);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Review not found'));
    });
};

export const addReview: RouteHandler<{ Body: NewReviewDTO }> = (req, res) => {
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
};
