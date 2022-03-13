# 🤖 node-rest-project

M2 Back-end REST project

## 🚀 How to run the app

### Requirements

To run the app, you must have [Docker 🐳](https://docs.docker.com/get-docker/)
, [Docker Compose](https://docs.docker.com/compose/install/) and [Node.js](https://nodejs.org/en/download/) installed on
your machine.

### Installation

To install, open a terminal at the root of the project and run:

```shell
npm install
```

### Running the app

1. First, open a terminal at the root of the project, and run:

```shell
docker-compose up
```

2. Second, still at the root of the project, run this command to build the project:

```shell
npm run build
```

3. Then make the migration of the database with this command:

```
npm run migration:run
```

4. To populate the database run:

- on MacOS/Linux `bash scripts/populate-db.sh`
- on Windows `./scripts/populate-db.ps1`

> To reset the database (drop all table):
>
> - on MacOS/Linux `bash scripts/reset-db.sh`
> - Windows `./scripts/reset-db.ps1`
>
> To remove all the data without droping tables:
>
> - on MacOS/Linux `bash scripts/clear-db.sh`
> - Windows `./scripts/clear-db.ps1`

5. Finally, in the same terminal, run this command to start:

```shell
npm run start
```

## 🧪 How to run the tests

This project comes with unit tests, which can be found in [the `tests` directory at the root of this project](./tests). These tests are written using [Jest](https://jestjs.io/).

### Running the tests

#### Without coverage

To run the tests without coverage reports, open a terminal at the root of this project and run:

```shell
npm run test
```

#### With coverage

To run the tests and generate a coverage report, open a terminal at the root of this project and run:

```shell
npm run test:coverage
```

The script will run the tests and generate a code coverage report (visible in the command line).
Since Jest has Istanbul built in, an HTML version of the coverage report will also be available [here](./coverage/index.html) after the script's execution.

This project uses Swagger to generate documentation for each endpoint. Once the app is running, the documentation is
available at [this address](http://localhost:7000/docs) (`http://localhost:7000/docs`).

## 👨‍🏫 Expectations

### Input validation

- [x] Strictly and deeply validate the type of every input (`params, querystring, body`) at runtime before any
      processing. **[1 point]** 🔵

> _How did you achieve this?_
>
> By using the `@sinclair/typebox` package and the type checking features of `fastify`, we were able to validate inputs without any trouble.

- [x] Ensure the type of every input can be inferred by Typescript at any time and properly propagates across the
      app. **[1 point]** 🔵

> _How did you achieve this?_
>
> Samely, using typebox and fastify, but also
> the addSchema feature and adding type generic definition to the handlers in between chevrons `<type here>`

- [x] Ensure the static and runtime input types are always synced. **[1 point]** 🔵

> How did you achieve this? If extra commands must be run before the typescript checking, how do you ensure there are run?
>
> `@sinclair/typebox` provides both a typescript interface AND a JSON schema without having to run any script, which removes the need for extra commands.

### Authorisation

- [x] Check the current user is allowed to call this endpoint. **[1 point]** 🔵

> How did you achieve this?
>
> We used what express calls a middleware, but fastify call a hook. It is a function that is called before all the other handlers, which allows a global check beforehands. This way the user permissions are validated.

- [x] Check the current user is allowed to perform the action on a specific resource. **[1 point]** 🔵

> How did you achieve this?
>
> Same as above but note that we also have different hooks for different purposes (such as checking ownership or login state).

- [x] Did you build or use an authorisation framework, making the authorisation widely used in your code
      base? **[1 point]**

> How did you achieve this?
>
> Once again see above and src/services/auth/check-is-[anything].service.ts

- [x] Do you have any way to ensure authorisation is checked on every endpoint? **[1 point]**

> How did you achieve this?
>
> On top of the mentionned above solutions, there also are some tests ensuring authorisation. (Special note : there is a redis that checks the session.)

### Secret and configuration management

- [x] Use a hash for any sensitive data you do not need to store as plain text. 🔵

> Also check this if you do not store any password or such data (and say it here).

- [x] Store your configuration entries in environment variables or outside the git scope. **[1 point]** 🔵

> How did you achieve this?
>
> Configuration is using the .env file, which is of course not in the git repository but needs to be set separatly.

- [x] Do you provide a way to list every configuration entries (setup instructions, documentation, requireness... are
      appreciated)? **[1 point]**

> How did you achieve this?
>
> The setup instructions are provided in the README above.

- [x] Do you have a kind of configuration validation with meaningful error messages? **[1 point]**

> How did you achieve this?
>
> Yes, error messages are different between Production and Development. A log setting allows to filter the results to your needs.

### Package management

- [~] Do not use any package with less than 50k downloads a week. 🔵

> `@sinclair/typebox` is at 35k so it is under 50k BUT it is advised by fastify [here](https://www.fastify.io/docs/latest/Reference/TypeScript/#typebox)

- [ ] Did you write some automated tools that check no unpopular dependency was installed? If yes, ensure it runs
      frequently. **[1 point]**

> How did you achieve this? A Github Action (or similar) and compliance rule for pull requests are appreciated.

- [x] Properly use dependencies and devDevepencies in your package.json. **[0.5 points]**

> How did you achieve this?
>
> We made sure to put in dependency only the packages that are used directly during runtime while in production.

### Automated API generation

- [x] Do you have automated documentation generation for your API (such as OpenAPI/Swagger...)? **[1 point]** 🔵

> How did you achieve this?
>
> We used `fastify-swagger` to allow clear and understandable endpoint documentation.

- [x] In addition to requireness and types, do you provide a comment for every property of your
      documentation? **[1 point]**

> How did you achieve this?
>
> Descriptions within swagger allow a clearer understanding of properties.

- [x] Do you document the schema of responses (at least for success codes) and provide examples of
      payloads? **[1 point]**

> How did you achieve this?
>
> The JSON schema have documentation using `typebox` and the various http answers that can be obtained.

- [ ] Is your documentation automatically built and published when a commit reach the develop or master
      branches? **[1 point]**

> No, it is an endpoint on the server.

### Error management

- [x] Do not expose internal application state or code (no sent stacktrace in production!). **[1 point]** 🔵

> How did you achieve this?
>
> We make sure to send only controled errors.

- [ ] Do you report errors to Sentry, Rollbar, Stackdriver… **[1 point]**

> No 😢

### Log management

- [x] Mention everything you put in place for a better debugging experience based on the logs collection and
      analysis. **[3 points]**

> How did you achieve this?
>
> In develop mode we have a prettified logging directly in the console, also as we are using an ORM we enable the logging to see every SQL query.

- [x] Mention everything you put in place to ensure no sensitive data were recorded to the log. **[1 point]**

> How did you achieve this?
>
> We only log requests and errors but not sensitive data like credentials.

### Asynchronous first

- [x] Always use the async implementations when available. **[1 point]** 🔵

> List all the functions you call in their async implementation instead of the sync one.
>
> We made sure to use Async as often as possible (all of them), no synchronous implementation was used during this project!

- [x] No unhandled promise rejections, no uncaught exceptions… **[1 point]** 🔵

> Using Eslint forced us to handle these situations if we wanted to go further.

### Code quality

- [x] Did you put a focus on reducing code duplication? **[1 point]**

> How did you achieve this?
>
> We did our best to follow good practices, even if our DTO part could surely use some improvement.

- [ ] Eslint rules are checked for any pushed commit to develop or master branch. **[1 point]**

> Please provide a link to the sample of Github Action logs (or similar).
>
> Sorry but not yet

### Automated tests

- [x] You implemented automated specs. **[1 point]** 🔵

> Please provide a link to the more complete summary you have.

```txt
Route /auth
    # POST /auth
      √ should fail with wrong credentials (82 ms)
      √ should return an existing user's token (12 ms)
    # POST /auth/register
      √ should fail for already existing user data (12 ms)
      √ should create a new user and return a token (24 ms)
```

```txt
Route /restaurants
    # GET /restaurants
      √ should request the `/restaurants` route (127 ms)
      √ should return a list of restaurants (9 ms)
    # POST /restaurants
      √ should fail when not authenticated (7 ms)
      √ should add a restaurant when authenticated (32 ms)
      √ should fail when the restaurant already exists (75 ms)
      √ should fail when the user already owns a restaurant (19 ms)
    # GET /restaurants/:id
      √ should request the `/restaurants/:id` route (15 ms)
      √ should return the correct restaurant (10 ms)
      √ should 404 when requesting a wrong id (54 ms)
    # PUT /restaurants/:id
      √ should fail when not authenticated (6 ms)
      √ should fail when the user is not the restaurant's owner (16 ms)
      √ should fail with an invalid restaurant id (17 ms)
      √ should correctly update the restaurant with id :id (21 ms)
    # PATCH /restaurants/:id
      √ should fail when not authenticated (5 ms)
      √ should fail when the user is not the restaurant's owner (15 ms)
      √ should fail with an invalid restaurant id (14 ms)
      √ should correctly update the restaurant with id :id (17 ms)
    # DELETE /restaurants/:id
      √ should fail when not authenticated (6 ms)
      √ should fail when the user is not the restaurant's owner (13 ms)
      √ should fail with an invalid restaurant id (15 ms)
      √ should correctly delete the restaurant with id :id (17 ms)
    # GET /restaurants/:id/reviews
      √ should request the `/restaurants/:id/reviews` route (10 ms)
      √ should return a list of reviews (9 ms)
    # POST /restaurants/:id/reviews
      √ should fail when not authenticated (7 ms)
      √ should add a review when authenticated (17 ms)
    # GET /restaurants/:id/reviews/:reviewId
      √ should request the `/restaurants/:id/reviews/:reviewId` route (10 ms)
      √ should return the review with id :reviewId (9 ms)
      √ should 404 when requesting a wrong id (12 ms)
    # PUT/PATCH /restaurants/:id/reviews/:reviewId
      √ should fail when not authenticated (7 ms)
      √ should fail when the user is not the review's reviewer (15 ms)
      √ should fail with an invalid review id (15 ms)
      √ should correctly update the review with id :reviewId (30 ms)
    # DELETE /restaurants/:id/reviews/:reviewId
      √ should fail when not authenticated (11 ms)
      √ should fail when the requesting user is not the review's reviewer (20 ms)
      √ should correctly delete the review with id :reviewId (18 ms)
```

```txt
Route /users
    # GET /users
      √ should request the `/users` route (86 ms)
      √ should return a list of users (9 ms)
    # GET /users/:id
      √ should request the `/users/:id` route (12 ms)
      √ should 404 when requesting a wrong id (53 ms)
      √ should return the correct user (10 ms)
    # PATCH /users/:id
      √ should fail when not authenticated (6 ms)
      √ should fail when the requesting user is not the requested user (14 ms)
      √ should correctly update the user with id :id (18 ms)
    # DELETE /users/:id
      √ should fail when not authenticated (14 ms)
      √ should fail when the requesting user is not the requested user (17 ms)
      √ should correctly delete the restaurant with id :id (16 ms)
    # GET /users/:id/reviews
      √ should request the `/users/:id/reviews` route (9 ms)
      √ should return the right list of reviews (8 ms)
    # POST /users/:id/reviews
      √ should fail when not authenticated (5 ms)
      √ should add a review when authenticated (13 ms)
      √ should fail when adding a review with an invalid grade (21 ms)
    # GET /users/:id/reviews/:reviewId
      √ should request the `/reviews/:id` route (9 ms)
      √ should return the correct review (9 ms)
      √ should 404 when requesting a wrong id (9 ms)
    # PUT /users/:id/reviews/:reviewId
      √ should fail when not authenticated (5 ms)
      √ should fail when the user is not the reviewer (15 ms)
      √ should 404 with an invalid id (15 ms)
      √ should fail when adding a review with an invalid grade (25 ms)
      √ should correctly update the review with id :reviewId (16 ms)
    # DELETE /users/:id/reviews/:reviewId
      √ should fail when not authenticated (4 ms)
      √ should fail when the user is not the reviewer (11 ms)
      √ should delete the review with id :reviewId (14 ms)
```

```txt
  Route /reviews
    # POST /reviews
      √ should fail when not authenticated (70 ms)
      √ should add a review when authenticated (27 ms)
      √ should fail when adding a review with an invalid grade (29 ms)
    # GET /reviews/:reviewId
      √ should request the `/reviews/:reviewId` route (11 ms)
      √ should return the correct review (9 ms)
      √ should 404 when requesting a wrong id (42 ms)
    # PUT /reviews/:reviewId
      √ should fail when not authenticated (7 ms)
      √ should fail when the user is not the reviewer (16 ms)
      √ should 404 with an invalid id (16 ms)
      √ should fail when updating a review with an invalid grade (29 ms)
      √ should correctly update the review with id :id (17 ms)
    # PATCH /reviews/:reviewId
      √ should fail when not authenticated (5 ms)
      √ should fail when the user is not the reviewer (14 ms)
      √ should fail for a review with an invalid id (15 ms)
      √ should fail when updating a review with an invalid grade (27 ms)
      √ should correctly update the review with id :id (15 ms)
    # DELETE /reviews/:reviewId
      √ should fail when not authenticated (4 ms)
      √ should fail when the user is not the reviewer (12 ms)
      √ should delete the review with id :reviewId (14 ms)
```

```txt
Test Suites: 4 passed, 4 total
Tests:       85 passed, 85 total
Snapshots:   0 total
Time:        7.724 s
Ran all test suites.
```

- [ ] Your test code coverage is 75% or more. **[1 point]** 🔵

> Please provide a link to the `istanbul` HTML coverage summary (or from a similar tool).
>
> See the README for all the links but here is a output of our command `npm run test:coverage`

```txt
------------------------------------|---------|----------|---------|---------|---------------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------------|---------|----------|---------|---------|---------------------------
All files                           |    94.5 |    93.78 |   90.74 |   94.02 |
 src                                |   92.85 |       50 |     100 |   92.59 |
  index.ts                          |   92.85 |       50 |     100 |   92.59 | 38-39
 src/configs                        |     100 |       70 |     100 |     100 |
  index.ts                          |     100 |      100 |     100 |     100 |
  redis.config.ts                   |     100 |       75 |     100 |     100 | 7-20
  server.config.ts                  |     100 |       50 |     100 |     100 | 15-22
  swagger.config.ts                 |     100 |      100 |     100 |     100 |
 src/controllers                    |    81.3 |      100 |   79.16 |   80.95 |
  auth.controller.ts                |     100 |      100 |     100 |     100 |
  restaurants.controller.ts         |      80 |      100 |      80 |      80 | 24-25,74-75,89-90
  reviews.controller.ts             |   77.14 |      100 |   73.33 |   77.14 | 28-29,69-70,98-99,114-115
  users.controller.ts               |   73.91 |      100 |      75 |   73.91 | 17-18,49-50,63-64
 src/dto                            |     100 |      100 |     100 |     100 |
  auth.dto.ts                       |     100 |      100 |     100 |     100 |
  generic.dto.ts                    |     100 |      100 |     100 |     100 |
  restaurant.dto.ts                 |     100 |      100 |     100 |     100 |
  review.dto.ts                     |     100 |      100 |     100 |     100 |
  user.dto.ts                       |     100 |      100 |     100 |     100 |
 src/dto/base                       |     100 |      100 |     100 |     100 |
  restaurant-base.dto.ts            |     100 |      100 |     100 |     100 |
  review-base.dto.ts                |     100 |      100 |     100 |     100 |
  user-base.dto.ts                  |     100 |      100 |     100 |     100 |
 src/entities                       |    98.5 |    98.44 |     100 |   98.24 |
  Restaurant.ts                     |     100 |    98.03 |     100 |     100 | 52
  Review.ts                         |   96.15 |    97.82 |     100 |   95.45 | 57
  User.ts                           |     100 |      100 |     100 |     100 |
 src/models                         |     100 |      100 |     100 |     100 |
  ErrorResponse.ts                  |     100 |      100 |     100 |     100 |
 src/routes                         |     100 |      100 |     100 |     100 |
  auth.route.ts                     |     100 |      100 |     100 |     100 |
  index.ts                          |     100 |      100 |     100 |     100 |
  restaurants.route.ts              |     100 |      100 |     100 |     100 |
  reviews.route.ts                  |     100 |      100 |     100 |     100 |
  users.route.ts                    |     100 |      100 |     100 |     100 |
 src/services/auth                  |   97.56 |    84.61 |     100 |   97.22 |
  check-is-authenticated.service.ts |    92.3 |    71.42 |     100 |   91.66 | 7
  check-is-owner.service.ts         |     100 |      100 |     100 |     100 |
  check-is-reviewer.service.ts      |     100 |      100 |     100 |     100 |
  check-is-self.service.ts          |     100 |      100 |     100 |     100 |
  index.ts                          |     100 |      100 |     100 |     100 |
 src/services/database              |     100 |      100 |     100 |     100 |
  restaurant-queries.service.ts     |     100 |      100 |     100 |     100 |
  review-queries.service.ts         |     100 |      100 |     100 |     100 |
  user-queries.service.ts           |     100 |      100 |     100 |     100 |
 src/utils                          |     100 |      100 |     100 |     100 |
  filterUndefinedProperty.ts        |     100 |      100 |     100 |     100 |
  nullable.ts                       |     100 |      100 |     100 |     100 |
------------------------------------|---------|----------|---------|---------|---------------------------
Test Suites: 4 passed, 4 total
Tests:       85 passed, 85 total
Snapshots:   0 total
Time:        11.034 s
Ran all test suites.
```

- [ ] Do you run the test on a CD/CI, such as Github Action? **[1 point]**

> Please provide a link to the latest test summary you have, hosted on Github Action or similar.
>
> No because we need the Database for the tests, we might find a way to move it but we did not yet.
