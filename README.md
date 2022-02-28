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

2. Second, still at the root of the project, run the command:

```
npm run migration:run
```

3. Build and run the app.

Still in a terminal at the root of the project, first run:

```shell
npm run build
```

Then, in the same terminal, run:

```shell
npm run start
```
