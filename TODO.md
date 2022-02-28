# ✅ TODO

## Endpoints

### Route `/restaurants`

| Method | Sub-route | Description                          | Auth level required | Done |
| ------ | --------- | ------------------------------------ | :-----------------: | :--: |
| GET    | `/`       | Gets all restaurants                 |        None         |      |
| POST   | `/`       | Adds a new restaurant                |      Logged in      |      |
| GET    | `/:id`    | Gets the restaurant with id `:id`    |        None         |      |
| PUT    | `/:id`    | Updates the restaurant with id `:id` |   Owner of `:id`    |      |
| DELETE | `/:id`    | Deletes the restaurant with id `:id` |   Owner of `:id`    |      |

### Route `/reviews`

| Method | Sub-route | Description                      | Auth level required | Done |
| ------ | --------- | -------------------------------- | :-----------------: | :--: |
| GET    | `/`       | Gets all reviews                 |        None         |      |
| POST   | `/`       | Adds a new review                |      Logged in      |      |
| GET    | `/:id`    | Gets the review with id `:id`    |        None         |      |
| PUT    | `/:id`    | Updates the review with id `:id` |  Reviewer of `:id`  |      |
| DELETE | `/:id`    | Deletes the review with id `:id` |  Reviewer of `:id`  |      |

### Route `/users`

| Method | Sub-route | Description                    | Auth level required | Done |
| ------ | --------- | ------------------------------ | :-----------------: | :--: |
| GET    | `/`       | Gets all users                 |        None         |      |
| GET    | `/:id`    | Gets the user with id `:id`    |        None         |      |
| PUT    | `/:id`    | Updates the user with id `:id` | User with id `:id`  |      |
| DELETE | `/:id`    | Deletes the user with id `:id` | User with id `:id`  |      |

### Route `/auth`

| Method | Sub-route   | Description          | Auth level required | Done |
| ------ | ----------- | -------------------- | :-----------------: | :--: |
| POST   | `/`         | Logs an User in      |        None         |      |
| POST   | `/register` | Registers a new User |        None         |      |

## 📄 Rapport

- Document endpoints

  - [ ] Re-explain [endpoints](#endpoints)

- Document technologies used in project
  - [ ] Fastify
  - [ ] TypeORM
  - [ ] Swagger
  - [ ] Postgres
  - [ ] Docker/Docker Compose
