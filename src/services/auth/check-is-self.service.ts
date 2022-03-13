import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export const checkIsSelf = (
  req: FastifyRequest<{ Params: { userId: number } }>,
  res: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (req.params.userId === req.session.userId) {
    done();
  } else {
    res.log.warn(
      `user ${req.session.userId} tried to access user ${req.params.userId}`
    );

    res.code(403).send(new Error('Can not update user that is not self'));
  }
};
