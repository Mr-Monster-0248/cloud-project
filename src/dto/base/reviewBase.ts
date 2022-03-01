import { Type, Static } from '@sinclair/typebox'; // package adviced by Fastify

export const reviewBase = Type.Object(
  {
    reviewId: Type.Integer(),
    content: Type.String(),
    grade: Type.Integer(),
  },
  { description: 'Model for a restaurant review', $id: 'reviewBase' }
);

export type reviewBase = Static<typeof reviewBase>;
