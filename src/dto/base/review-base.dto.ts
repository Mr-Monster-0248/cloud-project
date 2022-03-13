import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify

export const ReviewBaseDTO = Type.Object(
  {
    reviewId: Type.Integer(),
    content: Type.String(),
    grade: Type.Integer(),
  },
  { description: 'Model for the base of the restaurant review with core data', $id: 'ReviewBaseDTO' }
);

export type ReviewBaseDTO = Static<typeof ReviewBaseDTO>;
