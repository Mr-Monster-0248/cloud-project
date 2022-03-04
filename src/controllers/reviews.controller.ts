import { RouteHandler } from "fastify";
import {
  getOneReviewById, saveReview,
} from '../services/database/review-queries.service';
import { NewReviewDTO } from "../dto/review.dto";
import { Review } from '../entities/Review';

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
  const newReview = new Review(
    {
      content: req.body.content,
      grade: req.body.grade,
      reviewerId: req.session.userId,
      restaurantId: req.body.restaurantId
    }
  );

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
