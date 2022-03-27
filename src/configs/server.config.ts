import { FastifyServerOptions } from 'fastify';
import fastifyFactory from 'fastify';
import { config } from 'dotenv';
import { RestaurantBaseDTO } from '../dto/base/restaurant-base.dto';
import { NewRestaurantDTO, RestaurantDTO } from '../dto/restaurant.dto';
import { ReviewBaseDTO } from '../dto/base/review-base.dto';
import { ReviewDTO } from '../dto/review.dto';
import { UserBaseDTO } from '../dto/base/user-base.dto';
import { UserDTO } from '../dto/user.dto';
import { AuthDto, AuthResponseDto } from '../dto/auth.dto';

config();

const serverOptions: FastifyServerOptions = {
  logger: {
    level: 'info',
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
};

export const fastify = fastifyFactory(serverOptions)
  .addSchema(RestaurantBaseDTO)
  .addSchema(ReviewBaseDTO)
  .addSchema(UserBaseDTO)
  .addSchema(RestaurantDTO)
  .addSchema(NewRestaurantDTO)
  .addSchema(ReviewDTO)
  .addSchema(UserDTO)
  .addSchema(AuthDto)
  .addSchema(AuthResponseDto);
