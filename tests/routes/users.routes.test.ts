import { fastify } from '../setup';
import { buildURLObjectForTest } from '../helpers';
import { UserDTO, UpdateUserDTO } from '../../src/dto/user.dto';
import { User } from '../../src/entities/User';
import { deleteUser, saveUser } from '../../src/services/database/user-queries.service';

describe('Route /users', () => {

  const USERS_BASEURL = '/users';

  const USER_UPDATE_DTO: UpdateUserDTO = {
    username: 'Ruben',
  };

  const USER = new User({
    userId: 1,
    username: 'Ruben',
    token: 'c8cd21dd-e114-4cdc-919c-01e84a83112f',
  });

  const OTHER_USER_BEARER_TOKEN = '900eccd4-2eb7-4a49-9511-899ba4f076c1';

  // # GET /users
  describe('# GET /users', () => {
    it('should request the `/users` route', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(USERS_BASEURL),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });

    it('should return a list of users', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(USERS_BASEURL),
      });

      // Parse response payload as array of UserDTO
      const users = JSON.parse(res.payload) as UserDTO[];


      // Making sure that every object in the array passes the test
      expect.assertions(users.length);

      // Iterating over the array
      users.forEach((user) => {
        // Building a User instance from the retrieved UserDTO
        const actual = new User(
          {
            userId: user.userId,
            username: user.username,
          },
        );

        // Expecting every retrieved object to be a User object
        expect(actual).toBeInstanceOf(User);
      });
    });

    // TODO: test with unexpected params/query
  });


  // # GET /users/:id
  describe('# GET /users/:id', () => {
    it('should request the `/users/:id` route', async () => {
      const userID = 1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${userID}`),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });

    it('should return the correct user', async () => {
      const expected = 1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${expected}`),
      });

      // Parse response payload as UserDTO object
      const resto = JSON.parse(res.payload) as UserDTO;

      // Retrieve the user ID from the response
      const actual = resto.userId;

      // Expecting the returned user ID to match the one provided
      expect(actual).toEqual(expected);
    });

    it('should 404 when requesting a wrong id', async () => {
      // Invalid user ID
      const expected = -1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${expected}`),
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });
  });


  // # PATCH /users/:id
  describe('# PATCH /users/:id', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}`),
        payload: USER_UPDATE_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the requesting user is not the requested user', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}`),
        payload: USER_UPDATE_DTO,
        headers: {
          'Authorization': `Bearer ${OTHER_USER_BEARER_TOKEN}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should correctly update the user with id :id', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}`),
        payload: USER_UPDATE_DTO,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });


  // # DELETE /users/:id
  describe('# DELETE /users/:id', () => {
    const TEST_USER = new User({
      username: 'test_delete',
      password: 'test_delete_pwd',
      token: 'asdsdgdfghdfghjdfghj',
    });

        
    it('should fail when not authenticated', async () => {
      // Adding a test user to the DB
      TEST_USER.userId = await saveUser(TEST_USER);

      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${TEST_USER.userId}`)
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);

      // Removing the test user from the DB
      await deleteUser(TEST_USER.userId);
    });

    it('should fail when the requesting user is not the requested user', async () => {
      // Adding a test user to the DB
      TEST_USER.userId = await saveUser(TEST_USER);

      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${TEST_USER.userId}`),
        headers: {
          'Authorization': `Bearer ${OTHER_USER_BEARER_TOKEN}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);

      // Removing the test user from the DB
      await deleteUser(TEST_USER.userId);
    });

    it('should correctly delete the restaurant with id :id', async () => {
      // Adding a test user to the DB
      TEST_USER.userId = await saveUser(TEST_USER);
      
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${TEST_USER.userId}`),
        headers: {
          'Authorization': `Bearer ${TEST_USER.token}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });
});
