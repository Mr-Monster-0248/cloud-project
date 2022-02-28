import { RouteHandler } from 'fastify';
import { Restaurant } from '../models/Restaurant';

// data for dev purposes
const resto: Restaurant[] = [
  { name: 'resto 1', description: 'c cool 1' },
  { name: 'resto 2', description: 'c cool 2' },
  { name: 'resto 3', description: 'c cool 3' },
];

// GET /restaurants
const getRestaurants: RouteHandler = (req, res) => {
  res.code(200).send(resto);
};

// GET /restaurants/:id
const getRestaurant: RouteHandler<{ Params: { id: number } }> = (req, res) => {
  const r = resto[req.params.id];
  if (r) {
    res.code(200).send(r);
  } else {
    res.code(404).send(new Error('Not Found')); // TODO: build custom Error
  }
};

export { getRestaurant, getRestaurants };
