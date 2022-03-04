import { RouteHandler } from 'fastify';
import {
  getAllRestaurants,
  getOneRestaurantById,
  saveRestaurant,
} from '../services/database/restaurant-queries.service';
import { NewRestaurantDTO } from '../dto/restaurant.dto';
import { Restaurant } from '../entities/Restaurant';
import { User } from '../entities/User';

// GET /restaurants
const getRestaurants: RouteHandler = (req, res) => {
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
const getRestaurant: RouteHandler<{ Params: { id: number } }> = (req, res) => {
  // TODO: try catch
  getOneRestaurantById(req.params.id)
    .then((resto) => {
      res.code(200).send(resto);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Not Found')); // TODO: build custom Error
    });
};

const addRestaurant: RouteHandler<{ Body: NewRestaurantDTO }> = (req, res) => {
  const currentUser = new User();
  currentUser.userId = req.session.userId;

  const newResto = new Restaurant(
    {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      imgUrl: req.body.imgUrl,
    },
    currentUser
  );

  saveRestaurant(newResto)
    .then((restaurantId) => {
      res.code(201).send({ id: restaurantId });
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not create restaurant'));
    });
};

export { getRestaurant, getRestaurants, addRestaurant };
