import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify
import { Nullable } from '../../utils/nullable';

// TODO: change descriptions

export const RestaurantBaseDTO = Type.Object(
  {
    restaurantId: Type.Integer(),
    name: Type.String(),
    description: Nullable(Type.String()),
    address: Type.String(),
    imgUrl: Nullable(Type.String()),
  },
  { description: 'Restaurant model', $id: 'RestaurantBaseDTO' }
);

export type RestaurantBaseDTO = Static<typeof RestaurantBaseDTO>;
