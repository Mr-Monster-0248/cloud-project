import { RouteHandler } from "fastify";
import {
  getOneReviewById, saveReview,
} from '../services/database/review-queries.service';
import { NewReviewDTO } from "../dto/review.dto";
import { Review } from '../entities/Review';
import { User } from '../entities/User';
import { Restaurant } from '../entities/Restaurant';

const getReview: RouteHandler<{ Params: { reviewId: number } }> = async (req, res) => {
  const review = await getOneReviewById(req.params.reviewId);

  res.code(200).send(review);
};

const addReview: RouteHandler<{ Body: NewReviewDTO }> = async (req, res) => {
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
      res.code(201).send({ reviewId });
    })
    .catch((err) => {
      console.log(err);
      res.code(400).send(new Error('Could not create review'));
    });
}

export { getReview, addReview };