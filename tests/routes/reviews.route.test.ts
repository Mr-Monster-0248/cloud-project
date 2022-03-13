import { fastify } from '../setup';
import { buildURLObjectForTest } from '../helpers';
import { Review } from '../../src/entities/Review';
import { NewReviewDTO, ReviewDTO } from '../../src/dto/review.dto';

describe('Route /reviews', () => {

  const REVIEWS_BASEURL = '/reviews';

  const REVIEW_1_DTO: NewReviewDTO = {
    grade: 3,
    restaurantId: 1,
  };

  const REVIEW_1 = new Review({
    grade: 3,
    restaurantId: 1,
  });

  const REVIEW_2_DTO: NewReviewDTO = {
    grade: 5,
    content: 'meilleure sauce algérienne de toute la street',
    restaurantId: 1,
  };

  const GRADE_OF_6: NewReviewDTO = {
    grade: 6,
    restaurantId: 1,
  };

  const GRADE_OF_MINUS_ONE: NewReviewDTO = {
    grade: 6,
    restaurantId: 1,
  };

  const BEARER_TOKEN_USER_1 = 'c8cd21dd-e114-4cdc-919c-01e84a83112f';
  const BEARER_TOKEN_USER_2 = '900eccd4-2eb7-4a49-9511-899ba4f076c1';


  // # POST /reviews
  describe('# POST /reviews', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(REVIEWS_BASEURL),
        payload: REVIEW_1_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should add a review when authenticated', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(REVIEWS_BASEURL),
        payload: REVIEW_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      REVIEW_1.reviewId = JSON.parse(res.payload).id as number;

      // Expecting a HTTP 201 response (Created)
      expect(res.statusCode).toEqual(201);
    });

    it('should fail when adding a review with an invalid grade', async () => {
      const res1 = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(REVIEWS_BASEURL),
        payload: GRADE_OF_6,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      const res2 = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(REVIEWS_BASEURL),
        payload: GRADE_OF_MINUS_ONE,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 400 response (Bad request)
      expect(res1.statusCode).toEqual(400);

      // Expecting a HTTP 400 response (Bad request)
      expect(res2.statusCode).toEqual(400);
    });
  });

  
  // # GET /reviews/:reviewId
  describe('# GET /reviews/:reviewId', () => {
    it('should request the `/reviews/:reviewId` route', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/1`),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });

    it('should return the correct review', async () => {
      const expected = 1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${expected}`),
      });

      // Parse response payload as RestaurantDTO object
      const review = JSON.parse(res.payload) as ReviewDTO;

      // Retrieve the restaurant ID from the response
      const actual = review.reviewId;

      // Expecting the returned restaurant ID to match the one provided
      expect(actual).toEqual(expected);
    });

    it('should 404 when requesting a wrong id', async () => {
      // Invalid restaurant ID
      const requestedID = -1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${requestedID}`),
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });

    // TODO: test with unexpected params/query
  });


  // # PUT /reviews/:reviewId
  describe('# PUT /reviews/:reviewId', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: REVIEW_2_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the reviewer', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: REVIEW_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should 404 with an invalid id', async () => {
      const invalidId = -1;

      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${invalidId}`),
        payload: REVIEW_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });

    it('should fail when updating a review with an invalid grade', async () => {
      const res1 = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: GRADE_OF_6,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      const res2 = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: GRADE_OF_MINUS_ONE,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 400 response (Bad request)
      expect(res1.statusCode).toEqual(400);

      // Expecting a HTTP 400 response (Bad request)
      expect(res2.statusCode).toEqual(400);
    });

    it('should correctly update the review with id :id', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: REVIEW_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });


  // # PATCH /reviews/:reviewId
  describe('# PATCH /reviews/:reviewId', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: REVIEW_1_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the reviewer', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: REVIEW_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should fail for a review with an invalid id', async () => {
      const invalidId = -1;

      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${invalidId}`),
        payload: REVIEW_2_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });

    it('should fail when updating a review with an invalid grade', async () => {
      const res1 = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: GRADE_OF_6,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      const res2 = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: GRADE_OF_MINUS_ONE,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 400 response (Bad request)
      expect(res1.statusCode).toEqual(400);

      // Expecting a HTTP 400 response (Bad request)
      expect(res2.statusCode).toEqual(400);
    });

    it('should correctly update the review with id :id', async () => {
      const res = await fastify.inject({
        method: 'PATCH',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        payload: REVIEW_1_DTO,
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });


  // # DELETE /reviews/:reviewId
  describe('# DELETE /reviews/:reviewId', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the reviewer', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_2}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should delete the review with id :reviewId', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${REVIEWS_BASEURL}/${REVIEW_1.reviewId}`),
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN_USER_1}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });
});
