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

4. To pupulate the database run:

- on MacOS/Linux `bash scripts/populate-db.sh`
- on Windows `./script/populate-db.bat`

5. Finally, in the same terminal, run this command to start:

```shell
npm run start
```
