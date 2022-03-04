import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify
import { Nullable } from '../utils/nullable';
import { RestaurantBaseDTO } from './base/restaurant-base.dto';
import { UserBaseDTO } from './base/user-base.dto';

// TODO: change descriptions

export const ReviewDTO = Type.Object(
  {
    reviewId: Type.Integer(),
    content: Nullable(Type.String()),
    grade: Type.Integer(),
    reviewer: Type.Ref(UserBaseDTO),
    restaurant: Type.Ref(RestaurantBaseDTO),
  },
  { description: 'Model for a restaurant review', $id: 'ReviewDTO' }
);

export const ReviewResponseDTO = Type.Object(
  {
    reviewId: Type.Integer(),
    content: Nullable(Type.String()),
    grade: Type.Integer(),
    reviewer: Type.Ref(UserBaseDTO),
  },
  { description: 'Model for a restaurant review', $id: 'ReviewResponseDTO' }
);

export const NewReviewDTO = Type.Object(
  {
    content: Type.Optional(Type.String()),
    grade: Type.Integer(),
    restaurantId: Type.Integer(),
  },
  { description: 'Model for a new restaurant review', $id: 'NewReviewDTO' }
);

export const UpdateReviewDTO = Type.Object(
  {
    content: Type.Optional(Type.String()),
    grade: Type.Integer(),
  },
  { description: 'Model for a new restaurant review', $id: 'UpdateReviewDTO' }
);

export type ReviewDTO = Static<typeof ReviewDTO>;
export type ReviewResponseDTO = Static<typeof ReviewResponseDTO>;
export type NewReviewDTO = Static<typeof NewReviewDTO>;
export type UpdateReviewDTO = Static<typeof UpdateReviewDTO>;
