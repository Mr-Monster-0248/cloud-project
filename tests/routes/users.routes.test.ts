import { fastify } from '../setup';
import { buildURLObjectForTest } from '../helpers';
import { UserDTO, UpdateUserDTO } from '../../src/dto/user.dto';
import { User } from '../../src/entities/User';
import { deleteUser, saveUser } from '../../src/services/database/user-queries.service';
import { NewReviewDTO, ReviewDTO, ReviewResponseDTO } from '../../src/dto/review.dto';
import { Review } from '../../src/entities/Review';

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
  });


  // # GET /users/:id/reviews
  describe('# GET /users/:id/reviews', () => {
    it('should request the `/users/:id/reviews` route', async () => {
      const userID = 1;

      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${userID}/reviews`),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });

    it('should return the right list of reviews', async () => {
      const userId = 1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${userId}/reviews`),
      });

      // Parse response payload as array of ReviewResponseDTO
      const reviews = JSON.parse(res.payload) as ReviewResponseDTO[];


      // Making sure that every object in the array passes the test
      expect.assertions(reviews.length);

      // Iterating over the array
      reviews.forEach((review) => {
        // Building a Review instance from the retrieved ReviewResponseDTO
        const actual = new Review(
          {
            reviewId: review.reviewId,
            content: review.content || undefined,
            grade: review.grade,
            reviewer: review.reviewer as User,
          },
        );

        // Expecting every retrieved review to have the right reviewer
        expect(actual.reviewer.userId).toEqual(userId);
      });
    });
  });


  // # GET /users/:id/reviews/:reviewId
  describe('# GET /users/:id/reviews/:reviewId', () => {
    it('should request the `/reviews/:id` route', async () => {
      const userId = 1;
      const reviewId = 1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${userId}/reviews/${reviewId}`),
      });

      // Expecting the request to generate a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });

    it('should return the correct review', async () => {
      const userId = 1;
      const reviewId = 1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${userId}/reviews/${reviewId}`),
      });

      // Parse response payload as RestaurantDTO object
      const review = JSON.parse(res.payload) as ReviewDTO;

      // Retrieve the restaurant ID from the response
      const actual = review.reviewId;

      // Expecting the returned restaurant ID to match the one provided
      expect(actual).toEqual(reviewId);
    });

    it('should 404 when requesting a wrong id', async () => {
      const userId = 1;
      const invalidId = -1;
      
      const res = await fastify.inject({
        method: 'GET',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${userId}/reviews/${invalidId}`),
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });
  });


  // # POST /users/:id/reviews
  describe('# POST /users/:id/reviews', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews`),
        payload: REVIEW_1_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should add a review when authenticated', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews`),
        payload: REVIEW_1_DTO,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      REVIEW_1.reviewId = JSON.parse(res.payload).id as number;

      // Expecting a HTTP 201 response (Created)
      expect(res.statusCode).toEqual(201);
    });

    it('should fail when adding a review with an invalid grade', async () => {
      const res1 = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews`),
        payload: GRADE_OF_6,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      const res2 = await fastify.inject({
        method: 'POST',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews`),
        payload: GRADE_OF_MINUS_ONE,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      // Expecting a HTTP 400 response (Bad request)
      expect(res1.statusCode).toEqual(400);

      // Expecting a HTTP 400 response (Bad request)
      expect(res2.statusCode).toEqual(400);
    });
  });


  // # PUT /users/:id/reviews/:reviewId
  describe('# PUT /users/:id/reviews/:reviewId', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
        payload: REVIEW_2_DTO,
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the reviewer', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
        payload: REVIEW_2_DTO,
        headers: {
          'Authorization': `Bearer ${OTHER_USER_BEARER_TOKEN}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should 404 with an invalid id', async () => {
      const invalidId = -1;

      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${invalidId}`),
        payload: REVIEW_2_DTO,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      // Expecting a HTTP 404 response (Not found)
      expect(res.statusCode).toEqual(404);
    });

    it('should fail when adding a review with an invalid grade', async () => {
      const res1 = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
        payload: GRADE_OF_6,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      const res2 = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
        payload: GRADE_OF_MINUS_ONE,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      // Expecting a HTTP 400 response (Bad request)
      expect(res1.statusCode).toEqual(400);

      // Expecting a HTTP 400 response (Bad request)
      expect(res2.statusCode).toEqual(400);
    });

    it('should correctly update the review with id :reviewId', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
        payload: REVIEW_2_DTO,
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
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


  // # DELETE /users/:id/reviews/:reviewId
  describe('# DELETE /users/:id/reviews/:reviewId', () => {
    it('should fail when not authenticated', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
      });

      // Expecting a HTTP 401 response (Unauthorized)
      expect(res.statusCode).toEqual(401);
    });

    it('should fail when the user is not the reviewer', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
        headers: {
          'Authorization': `Bearer ${OTHER_USER_BEARER_TOKEN}`,
        },
      });

      // Expecting a HTTP 403 response (Forbidden)
      expect(res.statusCode).toEqual(403);
    });

    it('should delete the review with id :reviewId', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: buildURLObjectForTest(`${USERS_BASEURL}/${USER.userId}/reviews/${REVIEW_1.reviewId}`),
        headers: {
          'Authorization': `Bearer ${USER.token}`,
        },
      });

      // Expecting a HTTP 200 response (OK)
      expect(res.statusCode).toEqual(200);
    });
  });
});
