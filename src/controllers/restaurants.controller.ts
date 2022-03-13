import { FastifyReply, FastifyRequest, RouteHandler } from 'fastify';
import {
  deleteRestaurant,
  getAllRestaurants,
  getOneRestaurantById,
  saveRestaurant,
  updateRestaurant
} from '../services/database/restaurant-queries.service';
import { NewRestaurantDTO, RestaurantIdParam } from '../dto/restaurant.dto';
import { Restaurant } from '../entities/Restaurant';
import { filterUndefinedProperty } from '../utils/filterUndefinedProperty';

/**
 * Route handler for __/restaurants__
 * @param req request object
 * @param res response object
 */
export function getRestaurantsHandler(req: FastifyRequest, res: FastifyReply) {
  getAllRestaurants()
    .then((restos) => {
      res.code(200).send(restos);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(500).send(new Error('Something went wrong'));
    });
}

// GET /restaurants/:id
export function getRestaurantHandler(
  req: FastifyRequest<{ Params: RestaurantIdParam }>,
  res: FastifyReply
) {
  getOneRestaurantById(req.params.restaurantId)
    .then((resto) => {
      res.code(200).send(resto);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Not Found'));
    });
}

export function addRestaurantHandler(
  req: FastifyRequest<{ Body: NewRestaurantDTO }>,
  res: FastifyReply
) {
  const newResto = new Restaurant({ ...req.body, ownerId: req.session.userId });

  saveRestaurant(newResto)
    .then((restaurantId) => {
      res.code(201).send({ id: restaurantId });
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not create restaurant'));
    });
}

export function putPatchRestaurant(
  req: FastifyRequest<{
    Params: RestaurantIdParam;
    Body: Partial<NewRestaurantDTO>;
  }>,
  res: FastifyReply
) {
  const restaurantPayload = filterUndefinedProperty(req.body);

  updateRestaurant(req.params.restaurantId, restaurantPayload)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not update restaurant'));
    });
}

// DELETE /restaurants/:id
export function deleteRestaurantHandler(
  req: FastifyRequest<{ Params: RestaurantIdParam }>,
  res: FastifyReply
) {
  deleteRestaurant(req.params.restaurantId)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Not Found'));
    });
}
