import { buildURLObjectForTest } from '../helpers';
import { fastify } from '../setup';
import { Restaurant } from '../../src/entities/Restaurant';
import { Review } from '../../src/entities/Review';
import { User } from '../../src/entities/User';
import { NewRestaurantDTO, RestaurantDTO } from '../../src/dto/restaurant.dto';

describe('Route /restaurants', () => {
  const RESTO_BASEURL = '/restaurants';


  const RESTO_1_DTO: NewRestaurantDTO = {
    name: 'Reso 2 test',
    address: '40 rue de la fausse rue',
  };

  const RESTO_1 = new Restaurant({
    ownerId: 1,
    name: 'Resto 2 test',
    address: '40 rue de la fausse rue'
  });

  const RESTO_2_DTO: NewRestaurantDTO = {
    name: 'Reso 2 test - le retour',
    address: '40 rue de la fausse rue',
    description: 'Le vrai resto des vrais testeurs',
  };

  const BEARER_TOKEN_USER_1 = 'c8cd21dd-e114-4cdc-919c-01e84a83112f';
  const BEARER_TOKEN_USER_2 = '900eccd4-2eb7-4a49-9511-899ba4f076c1';


  // # GET /restaurants
  describe('# GET /restaurants', () => {
    it('should request the `/restaurants` route', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(RESTO_BASEURL),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
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

    // TODO: test with unexpected params/query
  });


  // # GET /restaurants/:id
  describe('# GET /restaurants/:id', () => {
    it('should request the `/restaurants/:id` route', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/1`),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
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

    it('should 404 when requesting a wrong id', async () => {
      // Invalid restaurant ID
      const expected = -1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${expected}`),
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });

    // TODO: test with unexpected params/query
  });


  // # POST /restaurants
  describe('# POST /restaurants', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(RESTO_BASEURL),
        payload: RESTO_1_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should add a restaurant when authenticated', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(RESTO_BASEURL),
        payload: RESTO_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      RESTO_1.restaurantId = JSON.parse(res.payload).id as number;

      // Expecting a HTTP 201 response (Created)
      expect(res.statusCode).toEqual(201);
    });

    it('TODO: should fail when the restaurant already exists', async () => {
      // TODO: fix address unicity constraint in Restaurant entity

      // const res = await fastify.inject({
      //   method: 'POST',
      //   url: buildURLObjectForTest(RESTO_BASEURL),
      //   payload: RESTO_1_DTO,
      //   headers: {
      //     'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
      //   },
      // });

      // Expecting a HTTP 400 response (Bad request)
      // expect(res.statusCode).toEqual(400);
    });

    it('should fail when the user already owns a restaurant', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(RESTO_BASEURL),
        payload: RESTO_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 400 response (Bad request)
      expect(res.statusCode).toEqual(400);
    });
  });


  // # PUT /restaurants/:id
  describe('# PUT /restaurants/:id', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_2_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the restaurant\'s owner', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should correctly update the restaurant with id :id', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });


  // # PATCH /restaurants/:id
  describe('# PATCH /restaurants/:id', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_1_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the restaurant\'s owner', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should correctly update the restaurant with id :id', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });


  // # DELETE /restaurants/:id
  describe('# DELETE /restaurants/:id', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_1_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the restaurant\'s owner', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should correctly delete the restaurant with id :id', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        payload: RESTO_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });
});
