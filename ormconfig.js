module.exports = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["database/entity/**/*.ts"],
  migrations: ["database/migration/**/*.ts"],
  subscribers: ["database/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "database/entity",
    migrationsDir: "database/migration",
    subscribersDir: "database/subscriber",
  },
};