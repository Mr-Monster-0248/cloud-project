import { preHandlerHookHandler } from 'fastify';
import { getOneUserByToken } from '../database/user-queries.service';

export const checkIsAuthenticated: preHandlerHookHandler = (req, res, done) => {
  const session = req.session;
  if (session && session.token && session.userId) {
    done();
  } else if (req.headers['authorization']) {
    const token = (req.headers['authorization'] as string).split(' ')[1];
    getOneUserByToken(token).then((user) => {
      req.session.userId = user.userId;
      req.session.token = user.token;
      done();
    });
  } else {
    res.code(401).send();
  }
};
