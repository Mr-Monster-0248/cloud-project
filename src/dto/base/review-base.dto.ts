import { Type, Static } from '@sinclair/typebox'; // package advised by Fastify

// TODO: change descriptions

export const ReviewBaseDTO = Type.Object(
  {
    reviewId: Type.Integer(),
    content: Type.String(),
    grade: Type.Integer(),
  },
  { description: 'Model for a restaurant review', $id: 'ReviewBaseDTO' }
);

export type ReviewBaseDTO = Static<typeof ReviewBaseDTO>;
