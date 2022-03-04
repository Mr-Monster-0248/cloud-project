import { RouteHandler } from "fastify";
import {
  getOneReviewById, saveReview,
} from '../services/database/review-queries.service';
import { NewReviewDTO } from "../dto/review.dto";
import { Review } from '../entities/Review';
import { User } from '../entities/User';
import { Restaurant } from '../entities/Restaurant';

const getReview: RouteHandler<{ Params: { reviewId: number } }> = (req, res) => {
  getOneReviewById(req.params.reviewId)
    .then((review) => {
      res.code(200).send(review);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Review not found'));
    });
};

const addReview: RouteHandler<{ Body: NewReviewDTO }> = (req, res) => {
  const currentUser = new User();
  currentUser.userId = req.session.userId;

  const resto = new Restaurant();
  resto.restaurantId = req.body.restaurantId;

  const newReview = new Review(
    {
      content: req.body.content,
      grade: req.body.grade,
    },
    currentUser,
    resto,
  );

  // FIXME: the query passes but still throws an error
  saveReview(newReview)
    .then((reviewId) => {
      res.code(201).send({ id: reviewId });
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not create review'));
    });
}

export { getReview, addReview };