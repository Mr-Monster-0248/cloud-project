module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development' ? ['query'] : false,
  entities: [
    process.env.NODE_ENV === 'development'
      ? 'src/entities/*.ts'
      : 'dist/src/entities/*.js',
  ],
  migrations: [
    process.env.NODE_ENV === 'development'
      ? 'migrations/*.ts'
      : 'dist/migrations/*.js',
  ],
  cli: {
    migrationsDir: 'migrations',
  },
};
