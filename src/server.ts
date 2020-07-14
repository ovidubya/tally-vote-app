import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { VoteRouter } from "./routes/vote";
import { TallyRouter } from "./routes/tally";
import session from "express-session";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    store: new (require("connect-pg-simple")(session))(),
    secret: "simple secret change please",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, //1 eeek
  })
);

createConnection()
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
      console.log("unable to create session table");
      console.log(e);
    }

    app.listen(process.env.PORT || 5000, () => {
      console.log("Listening on port: " + 5000);
    });
  })
  .catch((error) => console.log(error));
