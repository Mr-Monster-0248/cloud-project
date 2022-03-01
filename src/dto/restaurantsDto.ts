import { Type, Static } from '@sinclair/typebox'; // package adviced by Fastify
import { Nullable } from '../utils/nullable';
import { reviewBase } from './base/reviewBase';
import { userBase } from './base/userBase';

export const restaurantsDto = Type.Object(
  {
    restaurantId: Type.Integer(),
    name: Type.String(),
    description: Nullable(Type.String()),
    address: Type.String(),
    imgUrl: Nullable(Type.String()),
    owner: Type.Ref(userBase),
    reviews: Type.Array(Type.Ref(reviewBase)),
  },
  { description: 'Restaurant model', $id: 'restaurantsDto' }
);

export type restaurantsDto = Static<typeof restaurantsDto>;
