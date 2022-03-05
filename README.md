# 🤖 node-rest-project

M2 Back-end REST project

## 🚀 How to run the app

### Requirements

To run the app, you must have [Docker 🐳](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/) and [Node.js](https://nodejs.org/en/download/) installed on your machine.

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
- on Windows `./script/populate-db.ps1`

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
