import { fastify } from '../setup';
import { buildURLObjectForTest } from '../helpers';
import { Restaurant } from '../../src/entities/Restaurant';
import { Review } from '../../src/entities/Review';
import { User } from '../../src/entities/User';
import { NewRestaurantDTO, RestaurantDTO } from '../../src/dto/restaurant.dto';
import { ReviewResponseDTO, NewReviewDTO, UpdateReviewDTO } from '../../src/dto/review.dto';
import { deleteReview, saveReview } from '../../src/services/database/review-queries.service';
  

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
  });


  // # POST /restaurants
  describe('# # POST /restaurants', () => {
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

    it('should fail with an invalid restaurant id', async () => {
      const invalidId = -1;
      
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${invalidId}`),
        payload: RESTO_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
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

    it('should fail with an invalid restaurant id', async () => {
      const invalidId = -1;
      
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${invalidId}`),
        payload: RESTO_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
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
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the restaurant\'s owner', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should fail with an invalid restaurant id', async () => {
      const invalidId = -1;
      
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${invalidId}`),
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });

    it('should correctly delete the restaurant with id :id', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${RESTO_1.restaurantId}`),
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });


  // # GET /restaurants/:id/reviews
  describe('# GET /restaurants/:id/reviews', () => {
    it('should request the `/restaurants/:id/reviews` route', async () => {
      const restaurantId = 1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews`),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });

    it('should return a list of reviews', async () => {
      const restaurantId = 1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews`),
      });

      // Parse response payload as array of ReviewResponseDTO
      const reviews = JSON.parse(res.payload) as ReviewResponseDTO[];


      // Making sure that every object in the array passes the test
      expect.assertions(reviews.length);

      // Iterating over the array
      reviews.forEach((review) => {
        // Building a Review instance from the retrieved ReviewDTO
        const actual = new Review(
          {
            reviewId: review.reviewId as number,
            content: review.content || undefined,
            grade: review.grade as number,
            reviewer: (review.reviewer as User) || undefined,
          },
        );

        // Expecting every retrieved object to be a Review object
        expect(actual).toBeInstanceOf(Review);
      });
    });
  });


  // # POST /restaurants/:id/reviews
  describe('# POST /restaurants/:id/reviews', () => {
    const REVIEW_DTO: NewReviewDTO = {
      content: 'is pretty okayishly good',
      grade: 3,
      restaurantId: 1,
    };

    it('should fail when not authenticated', async () => {
      const restaurantId = 1;
      
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews`),
        payload: REVIEW_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should add a review when authenticated', async () => {
      const restaurantId = 1;
      
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews`),
        payload: REVIEW_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      const reviewId = JSON.parse(res.payload).id as number;

      // Expecting a HTTP 201 response (Created)
      expect(res.statusCode).toEqual(201);

      // Remove created review from DB
      await deleteReview(reviewId);
    });
  });


  // GET /restaurants/:id/reviews/:reviewId
  describe('# GET /restaurants/:id/reviews/:reviewId', () => {
    it('should request the `/restaurants/:id/reviews/:reviewId` route', async () => {
      const restaurantId = 1;
      const reviewId = 1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews/${reviewId}`),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });

    it('should return the review with id :reviewId', async () => {
      const restaurantId = 1;
      const reviewId = 1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews/${reviewId}`),
      });

      // Retrieve Review id
      const actual = JSON.parse(res.payload).reviewId as number;

      // Expecting every retrieved object to be a Review object
      expect(actual).toEqual(reviewId);
    });

    it('should 404 when requesting a wrong id', async () => {
      const restaurantId = 1;

      // Invalid review ID
      const expected = -1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews/${expected}`),
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });
  });


  // # PUT/PATCH /restaurants/:id/reviews/:reviewId
  describe('# PUT/PATCH /restaurants/:id/reviews/:reviewId', () => {
    const restaurantId = 1;
    const reviewId = 1;

    const REVIEW_UPDATE_DTO: NewReviewDTO = {
      content: 'is pretty okayishly good',
      grade: 3,
      restaurantId: restaurantId,
    };
    
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews/${reviewId}`),
        payload: REVIEW_UPDATE_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the review\'s reviewer', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews/${reviewId}`),
        payload: REVIEW_UPDATE_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    // TODO: should fail with an invalid review id

    it('should correctly update the review with id :reviewId', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${restaurantId}/reviews/${reviewId}`),
        payload: REVIEW_UPDATE_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });


  // # DELETE /restaurants/:id/reviews/:reviewId
  describe('# DELETE /restaurants/:id/reviews/:reviewId', () => {
    const TEST_REVIEW = new Review({
      reviewerId: 1,
      content: 'test content',
      grade: 2,
      restaurantId: 1,
    });
    
    it('should fail when not authenticated', async () => {
      // Adding a test review to the DB
      TEST_REVIEW.reviewId = await saveReview(TEST_REVIEW);

      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${TEST_REVIEW.restaurant.restaurantId}/reviews/${TEST_REVIEW.reviewId}`)
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);

      // Removing the test review from the DB
      await deleteReview(TEST_REVIEW.reviewId);
    });

    it('should fail when the requesting user is not the review\'s reviewer', async () => {
      // Adding a test review to the DB
      TEST_REVIEW.reviewId = await saveReview(TEST_REVIEW);

      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${TEST_REVIEW.restaurant.restaurantId}/reviews/${TEST_REVIEW.reviewId}`),
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);

      // Removing the test review from the DB
      await deleteReview(TEST_REVIEW.reviewId);
    });

    it('should correctly delete the review with id :reviewId', async () => {
      // Adding a test review to the DB
      TEST_REVIEW.reviewId = await saveReview(TEST_REVIEW);
      
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${RESTO_BASEURL}/${TEST_REVIEW.restaurant.restaurantId}/reviews/${TEST_REVIEW.reviewId}`),
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });
});
