# ✅ TODO

## Endpoints

### Restaurants

#### Path from root: `/restaurants`

| Method | Sub-route | Description                          | Auth level required | Done | Testing done |
| ------ | --------- | ------------------------------------ | :-----------------: | :--: | :----------: |
| GET    | `/`       | Gets all restaurants                 |        None         |  ✔   |      ✔       |
| POST   | `/`       | Adds a new restaurant                |     Registered      |  ✔   |      ✔       |
| GET    | `/:id`    | Gets the restaurant with id `:id`    |        None         |  ✔   |      ✔       |
| PUT    | `/:id`    | Updates the restaurant with id `:id` |   Owner of `:id`    |  ✔   |      ✔       |
| DELETE | `/:id`    | Deletes the restaurant with id `:id` |   Owner of `:id`    |  ✔   |      ✔       |

#### Path from root: `/restaurants/:id/reviews`

| Method    | Sub-route    | Description                               |   Auth level required   | Done | Testing done |
| --------- | ------------ | ----------------------------------------- | :---------------------: | :--: | :----------: |
| GET       | `/`          | Get all reviews for the restaurant `:id`  |          None           |  ✔   |              |
| POST      | `/`          | Adds a new review to the restaurant `:id` |       Registered        |  ✔   |              |
| GET       | `/:reviewId` | Gets the review with id `:reviewId`       |          None           |  ✔   |              |
| PUT/PATCH | `/:reviewId` | Updates the review with id `:reviewId`    | Reviewer of `:reviewId` |  ✔   |              |
| DELETE    | `/:reviewId` | Deletes the review with id `:reviewId`    | Reviewer of `:reviewId` |  ✔   |              |

### Reviews

#### Path from root: `/reviews`

| Method | Sub-route    | Description                            |   Auth level required   | Done | Testing done |
| ------ | ------------ | -------------------------------------- | :---------------------: | :--: | :----------: |
| GET    | `/:reviewId` | Gets the review with id `:reviewId`    |          None           |  ✔   |      ✔       |
| PUT    | `/:reviewId` | Updates the review with id `:reviewId` | Reviewer of `:reviewId` |  ✔   |      ✔       |
| DELETE | `/:reviewId` | Deletes the review with id `:reviewId` | Reviewer of `:reviewId` |  ✔   |      ✔       |

### Users

#### Path from root: `/users`

| Method | Sub-route | Description                    | Auth level required | Done | Testing done |
| ------ | --------- | ------------------------------ | :-----------------: | :--: | :----------: |
| GET    | `/`       | Gets all users                 |        None         |  ✔   |      ✔       |
| GET    | `/:id`    | Gets the user with id `:id`    |        None         |  ✔   |      ✔       |
| PUT    | `/:id`    | Updates the user with id `:id` | User with id `:id`  |  ✔   |      ✔       |
| DELETE | `/:id`    | Deletes the user with id `:id` | User with id `:id`  |  ✔   |      ✔       |

#### Path from root: `/users/:id/reviews`

| Method | Sub-route    | Description                            |   Auth level required   | Done | Testing done |
| ------ | ------------ | -------------------------------------- | :---------------------: | :--: | :----------: |
| GET    | `/`          | Get all reviews for the user `:id`     |          None           |  ✔   |              |
| POST   | `/`          | Adds a new review to the user `:id`    |   User with id `:id`    |  ✔   |              |
| GET    | `/:reviewId` | Gets the review with id `:reviewId`    |          None           |  ✔   |              |
| PUT    | `/:reviewId` | Updates the review with id `:reviewId` | Reviewer of `:reviewId` |  ✔   |              |
| DELETE | `/:reviewId` | Deletes the review with id `:reviewId` | Reviewer of `:reviewId` |  ✔   |              |

### Auth

#### Path from root: `/auth`

| Method | Sub-route   | Description                              | Auth level required | Done | Testing done |
| ------ | ----------- | ---------------------------------------- | :-----------------: | :--: | :----------: |
| POST   | `/`         | Sends back API key                       |        None         |  ✔   |      ✔       |
| POST   | `/register` | Registers a new User, sends back API key |        None         |  ✔   |      ✔       |

## 📄 Rapport

- Document endpoints

  - [ ] Re-explain [endpoints](#endpoints)

- Document technologies used in project
  - [ ] Fastify
  - [ ] TypeORM
  - [ ] Swagger
  - [ ] Postgres
  - [ ] Docker/Docker Compose

## Unit testing

- [ ] all routes (mock services ? + inject http)
- [ ] all services (mock database queries ?)
- [ ] authentication (mock database queries ?)
- [ ] utility functions

## Response code handling

### Success responses

- [ ] 200 OK
- [ ] 201 Created

### Error handling

- [ ] 400 bad request
- [ ] 401 unauthorised -> not auth
- [ ] 403 forbidden -> auth but no access
- [ ] 404 not found

- [ ] 500 internal server error
- [ ] 501 not implemented
