import { Type, Static } from '@sinclair/typebox'; // package adviced by Fastify
import { Nullable } from '../../utils/nullable';

export const restaurantBase = Type.Object(
  {
    restaurantId: Type.Integer(),
    name: Type.String(),
    description: Nullable(Type.String()),
    address: Type.String(),
    imgUrl: Nullable(Type.String()),
  },
  { description: 'Restaurant model', $id: 'restaurantBase' }
);

export type restaurantBase = Static<typeof restaurantBase>;
