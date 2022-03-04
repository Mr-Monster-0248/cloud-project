import { NewRestaurantDTO } from '../dto/restaurant.dto';
import { User } from '../entities/User';
import { Restaurant } from '../entities/Restaurant';

export const buildNewRestaurant = (
  restaurant: NewRestaurantDTO | Partial<NewRestaurantDTO>,
  ownerId: number
) => {
  const currentUser = new User();
  currentUser.userId = ownerId;

  return new Restaurant(
    {
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      imgUrl: restaurant.imgUrl,
    },
    currentUser
  );
};
