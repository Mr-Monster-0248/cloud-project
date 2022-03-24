FROM node:16

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY src /app/src
COPY migrations /app/migrations
COPY ormconfig.js ./

RUN npm install
RUN npm run build

EXPOSE 7000

# CMD ["node", "./dist/src/index.js"]
