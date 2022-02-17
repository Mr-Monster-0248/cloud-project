import { Type, Static } from '@sinclair/typebox'; // package adviced by Fastify

export const ErrorResponse = Type.Object({
  message: Type.String(),
  error: Type.String(),
  statusCode: Type.Number(),
});

export type ErrorResponse = Static<typeof ErrorResponse>;
