import { fastify } from '../setup';
import { buildURLObjectForTest } from '../helpers';
import { deleteUser, getOneUserByToken } from '../../src/services/database/user-queries.service';


describe('Route /auth', () => {

  const AUTH_BASEURL = '/auth';

  const AUTH_DTO = {
    username: 'testyboi',
    password: 'the_p4ssw0rd_for_testyboi'
  };

  const WRONG_CREDENTIALS = {
    username: 'qwerrtyifdfsadghgzsdghvgdxffffszfgzdfgdxfg',
    password: 'this user no existy'
  };

  const EXISTING_USER_DTO = {
    username: 'Ruben',
    password: 'azerty',
  };


  // # POST /auth
  describe('# POST /auth', () => {
    it('should fail with wrong credentials', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${AUTH_BASEURL}`),
        payload: WRONG_CREDENTIALS,
      });

      // Expecting a HTTP 403 response (Created)
      expect(res.statusCode).toEqual(403);
    });

    it('should return an existing user\'s token', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${AUTH_BASEURL}`),
        payload: EXISTING_USER_DTO,
      });

      // Parse response payload as AuthResponseDTO object
      const AUTH_TOKEN = JSON.parse(res.payload).token as string;

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);

      // Expecting the returned token to exist
      expect(AUTH_TOKEN).not.toBe('');
    });
  });


  // # POST /auth
  describe('# POST /auth/register', () => {
    it('should fail for already existing user data', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${AUTH_BASEURL}/register`),
        payload: EXISTING_USER_DTO,
      });

      // Expecting a HTTP 403 response (Created)
      expect(res.statusCode).toEqual(403);
    });

    it('should create a new user and return a token', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${AUTH_BASEURL}/register`),
        payload: AUTH_DTO,
      });

      // Parse response payload as AuthResponseDTO object
      const AUTH_TOKEN = JSON.parse(res.payload).token as string;

      // Expecting a HTTP 201 response (Created)
      expect(res.statusCode).toEqual(201);

      // Expecting the returned token to exist
      expect(AUTH_TOKEN).not.toBe('');

      // Removing the created user from the DB
      const idToDelete = (await getOneUserByToken(AUTH_TOKEN)).userId;
      await deleteUser(idToDelete);
    });
  });
});