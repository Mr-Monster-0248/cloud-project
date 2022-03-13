import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify
import { Nullable } from '../../utils/nullable';

export const RestaurantBaseDTO = Type.Object(
  {
    restaurantId: Type.Integer(),
    name: Type.String(),
    description: Nullable(Type.String()),
    address: Type.String(),
    imgUrl: Nullable(Type.String()),
  },
  {
    description: 'Base for the restaurant model with core elements',
    $id: 'RestaurantBaseDTO',
  }
);

export type RestaurantBaseDTO = Static<typeof RestaurantBaseDTO>;
