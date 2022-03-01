import { RouteHandler } from 'fastify';
import { Restaurant } from '../entities/Restaurant';
import { getConnection } from 'typeorm';

// GET /restaurants
const getRestaurants: RouteHandler = async (req, res) => {
  const restos = await getConnection()
    .getRepository(Restaurant)
    .createQueryBuilder('restaurant')
    .leftJoinAndSelect('restaurant.owner', 'user')
    .leftJoinAndSelect('restaurant.reviews', 'review')
    .getMany();

  console.log(restos);
  res.code(200).send(restos);
};

// GET /restaurants/:id
const getRestaurant: RouteHandler<{ Params: { id: number } }> = async (
  req,
  res
) => {
  const resto = await getConnection()
    .getRepository(Restaurant)
    .createQueryBuilder('restaurant')
    .leftJoinAndSelect('restaurant.owner', 'user')
    .leftJoinAndSelect('restaurant.reviews', 'review')
    .where('restaurant.restaurantId = :id', { id: req.params.id })
    .getOne();

  if (resto) {
    res.code(200).send(resto);
  } else {
    res.code(404).send(new Error('Not Found')); // TODO: build custom Error
  }
};

export { getRestaurant, getRestaurants };
