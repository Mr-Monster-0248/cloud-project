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
const getRestaurants: RouteHandler = async (req, res) => {
  const restos = await getAllRestaurants();

  res.code(200).send(restos);
};

// GET /restaurants/:id
const getRestaurant: RouteHandler<{ Params: { id: number } }> = (req, res) => {
  // TODO: try catch
  getOneRestaurantById(req.params.id)
    .then((resto) => {
      res.code(200).send(resto);
    })
    .catch(() => {
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
    .then(() => {
      res.code(201).send();
    })
    .catch(() => {
      res.code(400).send(new Error('Could not create restaurant'));
    });
};

export { getRestaurant, getRestaurants, addRestaurant };
