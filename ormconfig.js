module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === 'development'
      ? 'src/entities/*.ts'
      : 'dist/entities/*.js',
  ],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
