import { RouteHandler } from 'fastify';
import {
  getAllRestaurants,
  getOneRestaurantById,
  saveRestaurant,
  updateRestaurant
} from '../services/database/restaurant-queries.service';
import { NewRestaurantDTO, RestaurantIdParam } from '../dto/restaurant.dto';
import { Restaurant } from '../entities/Restaurant';
import { User } from '../entities/User';
import { buildNewRestaurant } from '../utils/restaurant-helper';

/**
 * Route handler for __/restaurants__
 * @param req request object
 * @param res response object
 */
export const getRestaurants: RouteHandler = (req, res) => {
  getAllRestaurants()
    .then((restos) => {
      res.code(200).send(restos);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(500).send(new Error('Something went wrong'));
    });
};

// GET /restaurants/:id
export const getRestaurant: RouteHandler<{ Params: RestaurantIdParam }> = (
  req,
  res
) => {
  getOneRestaurantById(req.params.restaurantId)
    .then((resto) => {
      res.code(200).send(resto);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Not Found')); // TODO: build custom Error
    });
};

export const addRestaurant: RouteHandler<{ Body: NewRestaurantDTO }> = (
  req,
  res
) => {
  const newResto = buildNewRestaurant({...req.body}, req.session.userId)

  saveRestaurant(newResto)
    .then((restaurantId) => {
      res.code(201).send({ id: restaurantId });
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not create restaurant'));
    });
};

export const putRestaurant: RouteHandler<{
  Params: RestaurantIdParam;
  Body: NewRestaurantDTO;
}> = (req, res) => {
  const newResto = buildNewRestaurant({...req.body}, req.session.userId)

  updateRestaurant(newResto, req.params.restaurantId)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not update restaurant'));
    });
};
