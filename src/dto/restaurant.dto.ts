import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify
import { Nullable } from '../utils/nullable';
import { ReviewBaseDTO } from './base/review-base.dto';
import { UserBaseDTO } from './base/user-base.dto';

export const RestaurantDTO = Type.Object(
  {
    restaurantId: Type.Integer(),
    name: Type.String(),
    description: Nullable(Type.String()),
    address: Type.String(),
    imgUrl: Nullable(Type.String()),
    owner: Type.Ref(UserBaseDTO),
    reviews: Type.Optional(Type.Array(Type.Ref(ReviewBaseDTO))),
  },
  { description: 'Standard restaurant model', $id: 'RestaurantDTO' }
);

export const NewRestaurantDTO = Type.Object(
  {
    name: Type.String(),
    description: Type.Optional(Type.String()),
    address: Type.String(),
    imgUrl: Type.Optional(Type.String()),
  },
  { description: 'New Restaurant model', $id: 'NewRestaurantDTO' }
);

export const UpdateRestaurantDTO = Type.Partial(NewRestaurantDTO, {
  description: 'Partial restaurant model for updating purposes',
  $id: 'UpdateRestaurantDTO',
});

export const RestaurantIdParam = Type.Object({ restaurantId: Type.Integer() });

export type RestaurantDTO = Static<typeof RestaurantDTO>;
export type NewRestaurantDTO = Static<typeof NewRestaurantDTO>;
export type RestaurantIdParam = Static<typeof RestaurantIdParam>;
