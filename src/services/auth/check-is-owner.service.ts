import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { getOneRestaurantById } from '../database/restaurant-queries.service';

export const checkIsOwner = (
  req: FastifyRequest<{ Params: { restaurantId: number } }>,
  res: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  getOneRestaurantById(req.params.restaurantId)
    .then((restaurant) => {
      if (restaurant.owner.userId === req.session.userId) {
        done();
      } else {
        res.log.warn(
          `user ${req.session.userId} tried to access restaurant ${req.params.restaurantId}`
        );
        res.code(403).send(new Error('You need to be owner of the restaurant'));
      }
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Restaurant not found'));
    });
};
