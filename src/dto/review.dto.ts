import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify
import { RestaurantBaseDTO } from './base/restaurant-base.dto';
import { UserBaseDTO } from './base/user-base.dto';

// TODO: change descriptions

export const ReviewDTO = Type.Object(
  {
    reviewId: Type.Integer(),
    content: Type.String(),
    grade: Type.Integer(),
    reviewer: Type.Ref(UserBaseDTO),
    restaurant: Type.Ref(RestaurantBaseDTO)
  },
  { description: 'Model for a restaurant review', $id: 'ReviewDTO' }
);

export type ReviewDTO = Static<typeof ReviewDTO>;
