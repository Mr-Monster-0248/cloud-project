import { getConnection } from 'typeorm';
import { Restaurant } from '../../entities/Restaurant';
import { User } from '../../entities/User';

/**
 * Retrieve all the Restaurants from the DB
 * @returns Array of Restaurant as a Promise
 */
export async function getAllRestaurants(): Promise<Restaurant[]> {
  // Return the resulting array of Restaurant
  return await getConnection()
    .getRepository(Restaurant)
    .createQueryBuilder('restaurant')
    .leftJoinAndSelect('restaurant.owner', 'user')
    // TODO: Decide whether to keep or not
    // .leftJoinAndSelect('restaurant.reviews', 'review')
    .getMany();
}

/**
 * Retrieve a single Restauant from the DB from its ID
 * @param restaurantId The ID of the Restaurant to retrieve
 * @returns
 */
export async function getOneRestaurantById(
  restaurantId: number
): Promise<Restaurant> {
  // Return the resulting Restaurant of fail
  return await getConnection()
    .getRepository(Restaurant)
    .createQueryBuilder('restaurant')
    .leftJoinAndSelect('restaurant.owner', 'user')
    .leftJoinAndSelect('restaurant.reviews', 'review')
    .where('restaurant.restaurantId = :id', { id: restaurantId })
    .getOneOrFail();
}

/**
 * Save a Restaurant in the DB
 * @param restaurant The Restaurant to save
 * @returns
 */
export async function saveRestaurant(restaurant: Restaurant) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Restaurant)
    .values({
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      imgUrl: restaurant.imgUrl,
      owner: restaurant.owner,
    })
    .execute();
}

/**
 * Delete a Restaurant from the DB
 * @param restaurantId The ID of the Restaurant to delete
 */
export async function deleteRestaurant(restaurantId: number) {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Restaurant)
    .where('restaurantId = :id', { id: restaurantId })
    .execute();
}
