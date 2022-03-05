import { FastifyReply, FastifyRequest } from 'fastify';
import {
  deleteUser,
  getAllUsers,
  getOneUserById,
  updateUser,
} from '../services/database/user-queries.service';
import { UpdateUserDto, UserIdParam } from '../dto/user.dto';
import { filterUndefinedProperty } from '../utils/filterUndefinedProperty';

export function getUsersHandler(req: FastifyRequest, res: FastifyReply) {
  getAllUsers()
    .then((users) => {
      res.code(200).send(users);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(500).send(new Error('Something went wrong'));
    });
}

export function getOneUserHandler(
  req: FastifyRequest<{ Params: UserIdParam }>,
  res: FastifyReply
) {
  getOneUserById(req.params.userId)
    .then((user) => {
      res.code(200).send(user);
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Not Found'));
    });
}

export function patchUserHandler(
  req: FastifyRequest<{ Params: UserIdParam; Body: UpdateUserDto }>,
  res: FastifyReply
) {
  const userPayload = filterUndefinedProperty({
    username: req.body.username,
    password: req.body.password,
  });
  updateUser(req.params.userId, userPayload)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(400).send(new Error('Could not update user'));
    });
}

export function deleteUserHandler(
  req: FastifyRequest<{ Params: UserIdParam }>,
  res: FastifyReply
) {
  deleteUser(req.params.userId)
    .then(() => {
      res.code(200).send();
    })
    .catch((err) => {
      res.log.error(err);
      res.code(404).send(new Error('Not Found'));
    });
}
