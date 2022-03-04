import { buildURLObjectForTest } from '../helpers';
import { fastify } from '../setup';
import { Restaurant } from '../../src/entities/Restaurant';
import { Review } from '../../src/entities/Review';
import { User } from '../../src/entities/User';
import { RestaurantDTO } from '../../src/dto/restaurant.dto';

describe('Route /restaurants', () => {
  const RESTO_BASEURL = '/restaurants';

  // # GET /restaurants
  describe('# GET /restaurants', () => {
    it('should request the `/restaurants` route', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(RESTO_BASEURL),
      });

      // Expecting the request to generate a HTTP 200 response (route health check)
      expect(res.statusCode).toEqual(200);
    });

    it('should return a list of restaurants', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(RESTO_BASEURL),
      });

      // Parse response payload as array of RestaurantDTO
      const restos = JSON.parse(res.payload) as RestaurantDTO[];


      // Making sure that every object in the array passes the test
      expect.assertions(restos.length);

      // Iterating over the array
      restos.forEach((resto) => {
        // Building a Restaurant instance from the retrieved RestaurantDTO
        const actual = new Restaurant(
          {
            name: resto.name,
            description: resto.description || undefined,
            imgUrl: resto.imgUrl || undefined,
            address: resto.address,
            owner: (resto.owner as User) || undefined,
          },
        );

        // Expecting every retrieved object to be a Restaurant object
        expect(actual).toBeInstanceOf(Restaurant);
      });
    });
  });


  // # GET /restaurants/:id
  describe('# GET /restaurants/:id', () => {
    it('should request the `/restaurants/:id` route', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/1`),
      });

      // Expecting the request to generate a HTTP 200 response (route health check)
      expect(res.statusCode).toEqual(200);
    });

    it('should return the correct restaurant', async () => {
      const expected = 1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${expected}`),
      });

      // Parse response payload as RestaurantDTO object
      const resto = JSON.parse(res.payload) as RestaurantDTO;

      // Retrieve the restaurant ID from the response
      const actual = resto.restaurantId;

      // Expecting the returned restaurant ID to match the one provided
      expect(actual).toEqual(expected);
    });

    it('should fail when requesting a wrong id', async () => {
      // Invalid restaurant ID
      const expected = -1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${expected}`),
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });
  });
});
