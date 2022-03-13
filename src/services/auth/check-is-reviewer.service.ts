import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { getOneReviewById } from '../database/review-queries.service';

export const checkIsReviewer = (
  req: FastifyRequest<{ Params: { reviewId: number } }>,
  res: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  getOneReviewById(req.params.reviewId)
    .then((restaurant) => {
      if (restaurant.reviewer.userId === req.session.userId) {
        done();
      } else {
        res.log.warn(
          `user ${req.session.userId} tried to access review ${req.params.reviewId}`
        );
        res.code(403).send(new Error('You need to be reviewer of the review'));
      }
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Review not found'));
    });
};
