import { Static, Type } from '@sinclair/typebox'; // package advised by Fastify
import { Nullable } from '../utils/nullable';
import { RestaurantBaseDTO } from './base/restaurant-base.dto';
import { UserBaseDTO } from './base/user-base.dto';

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
    content: Type.Optional(Type.String()),
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

export const ReviewIdParam = Type.Object({ reviewId: Type.Integer() });

export const ReviewFromUserOrRestaurantParam = Type.Object({
  reviewerId: Type.Optional(Type.Integer()),
  restaurantId: Type.Optional(Type.Integer()),
  reviewId: Type.Integer(),
});

export type ReviewDTO = Static<typeof ReviewDTO>;
export type ReviewResponseDTO = Static<typeof ReviewResponseDTO>;
export type NewReviewDTO = Static<typeof NewReviewDTO>;
export type UpdateReviewDTO = Static<typeof UpdateReviewDTO>;
export type ReviewIdParam = Static<typeof ReviewIdParam>;
export type ReviewFromUserOrRestaurantParam = Static<
  typeof ReviewFromUserOrRestaurantParam
>;
