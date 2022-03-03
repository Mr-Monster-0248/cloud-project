import { RouteHandler } from 'fastify';
import { AuthDto } from '../dto/auth.dto';
import { getTokenByUsernameAndPassword } from '../services/database/user-queries.service';
import crypto from 'crypto';

export const loginUser: RouteHandler<{ Body: AuthDto }> = (req, res) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(req.body.password)
    .digest('hex');

  getTokenByUsernameAndPassword(req.body.username, hashedPassword)
    .then((user) => {
      res.code(200).send({ token: user.token });
    })
    .catch(() => {
      req.log.warn(
        `Failed login attempt with username: ${req.body.username} and password: ${req.body.password}`
      );
      res.code(403).send(new Error('Bad username or password'));
    });
};
