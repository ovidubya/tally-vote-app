import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { VoteRouter } from "./routes/vote";
import { TallyRouter } from "./routes/tally";
import session from "express-session";
import cors from "cors";

const app = express();
console.log("what is OVADIA_TEST");
console.log(process.env.OVADIA_TEST);

app.use(
  cors({
    origin: [
      "https://boiling-reef-23922.herokuapp.com/tally",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    store: new (require("connect-pg-simple")(session))(),
    secret: "simple secret change please",
    resave: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, //1 eeek
  })
);

createConnection({
  type: "postgres",
  host: "ec2-34-206-31-217.compute-1.amazonaws.com",
  port: 5432,
  username: "gvlsdpqkpnilmd",
  password: "c3a0ec212e45c84bbaa6546f60ccd5aca06364b7fd4971617eadbedfb91cc3ea",
  database: "d24fsed78tlms",
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
})
  .then(async (connection) => {
    app.use("/vote", VoteRouter(connection));
    app.use("/tally", TallyRouter(connection));
    try {
      await connection.manager.query(`
      CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);
      
      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
      
      CREATE INDEX "IDX_session_expire" ON "session" ("expire");
    `);
    } catch (e) {
      console.log("Unable to create session table");
    }

    app.listen(process.env.PORT || 5000, () => {
      console.log("Listening on port: " + 5000);
    });
  })
  .catch((error) => console.log(error));
