import { RouteHandler } from 'fastify';
import {
  deleteReview,
  getAllReviews,
  getOneReviewById,
  saveReview, updateReview
} from '../services/database/review-queries.service';
import {
  NewReviewDTO,
  ReviewFromUserOrRestaurantParam,
  ReviewIdParam,
} from '../dto/review.dto';
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

export const getReview: RouteHandler<{
  Params: ReviewFromUserOrRestaurantParam;
}> = (req, res) => {
  console.log(req.params);
  getOneReviewById(req.params.reviewId, { ...req.params })
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

export const putPatchReview: RouteHandler<{
  Params: ReviewFromUserOrRestaurantParam;
  Body: NewReviewDTO | Partial<NewReviewDTO>;
}> = (req, res) => {
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
};

export const delReview: RouteHandler<{
  Params: ReviewFromUserOrRestaurantParam;
}> = (req, res) => {
  deleteReview(req.params.reviewId)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not delete review'));
    });
};
