import { RouteHandler } from 'fastify';
import { getAllRestaurants, getOneRestaurantById } from '../services/database/restaurant-queries.service';

// GET /restaurants
const getRestaurants: RouteHandler = async (req, res) => {
  const restos = await getAllRestaurants();

  res.code(200).send(restos);
};

// GET /restaurants/:id
const getRestaurant: RouteHandler<{ Params: { id: number } }> = async (
  req,
  res
) => {
  // TODO: try catch
  const resto = await getOneRestaurantById(req.params.id);

  if (resto) {
    res.code(200).send(resto);
  } else {
    res.code(404).send(new Error('Not Found')); // TODO: build custom Error
  }
};

export { getRestaurant, getRestaurants };
