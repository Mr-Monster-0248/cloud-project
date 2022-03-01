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
    reviews: Type.Array(Type.Ref(ReviewBaseDTO)),
  },
  { description: 'Restaurant model', $id: 'RestaurantDTO' }
);

export type RestaurantDTO = Static<typeof RestaurantDTO>;
