import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { VoteRouter } from "./routes/vote";
import session from "express-session";
import cors from "cors";
// @ts-ignore
// import SQLiteStoreGenerator from "connect-sqlite3";

// const SQLiteStore = SQLiteStoreGenerator(session);

const app = express();
app.use(cors());
app.use(express.json());
// app.use(
//   session({
//     store: new SQLiteStore({
//       table: "session",
//       db: "database.sqlite",
//       dir: process.cwd(),
//     }),
//     secret: "your secret",
//     cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
//   })
// );

createConnection()
  .then(async (connection) => {
    app.use("/vote", VoteRouter(connection));
    app.listen(process.env.PORT || 5000, () => {
      console.log("Listening on port: " + 5000);
    });
  })
  .catch((error) => console.log(error));
