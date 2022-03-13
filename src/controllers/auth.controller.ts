import { RouteHandler } from 'fastify';
import { AuthDto } from '../dto/auth.dto';
import {
  getTokenByUsernameAndPassword,
  saveUser,
} from '../services/database/user-queries.service';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/User';

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

export const registerUser: RouteHandler<{ Body: AuthDto }> = (req, res) => {
  const hashedPassword = crypto
    .createHash('md5')
    .update(req.body.password)
    .digest('hex');

  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    token: uuidv4(),
  });

  saveUser(newUser)
    .then(() => {
      res.code(201).send({ token: newUser.token });
    })
    .catch(() => {
      req.log.warn(
        `Failed to create user with username: ${req.body.username} and password: ${req.body.password}`
      );
      res.code(403).send(new Error('Can not use this username'));
    });
};
