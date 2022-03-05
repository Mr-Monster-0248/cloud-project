import { buildURLObjectForTest } from '../helpers';
import { fastify } from '../setup';

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

  let AUTH_TOKEN = '';


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
      AUTH_TOKEN = JSON.parse(res.payload).token as string;

      // Expecting a HTTP 201 response (Created)
      expect(res.statusCode).toEqual(201);

      // Expecting the returned token to exist
      expect(AUTH_TOKEN).not.toBe('');
    });
  });


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

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);

      // Expecting the returned token to exist
      expect(AUTH_TOKEN).not.toBe('');
    });
  });
});