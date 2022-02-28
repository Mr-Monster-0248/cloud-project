import { RouteHandler } from 'fastify';
import { Restaurant } from '../entities/Restaurant';
import { getConnection } from "typeorm";

// GET /restaurants
const getRestaurants: RouteHandler = async (req, res) => {
  const restaurantRepository = getConnection().getRepository(Restaurant); // MUST BE DEFINED HERE OR IT CRASHES
  const restos = await restaurantRepository.find();

  res.code(200).send(restos);
};

// GET /restaurants/:id
const getRestaurant: RouteHandler<{ Params: { id: number } }> = async (req, res) => {
  const restaurantRepository = getConnection().getRepository(Restaurant); // MUST BE DEFINED HERE OR IT CRASHES
  const resto = await restaurantRepository.findOne(req.params.id);

  if (resto) {
    res.code(200).send(resto);
  } else {
    res.code(404).send(new Error('Not Found')); // TODO: build custom Error
  }
};

export { getRestaurant, getRestaurants };
