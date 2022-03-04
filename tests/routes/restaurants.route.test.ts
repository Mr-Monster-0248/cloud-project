import { buildURLObjectForTest } from '../helpers';
import { fastify } from '../setup';

describe('/restaurants', () => {

  // # GET /restaurants
  describe('# GET /restaurants', () => {
    const RESTAURANTS_BASEURL = '/restaurants';

    it('should request the `/restaurants` route', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(RESTAURANTS_BASEURL),
      });

      expect(res.statusCode).toEqual(200);
    });
  });
});
