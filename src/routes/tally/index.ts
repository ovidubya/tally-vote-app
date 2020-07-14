import express from "express";
import { Connection } from "typeorm";

import { UserService } from "../../services/user/userService";

export const TallyRouter = (connection: Connection) => {
  const Router = express.Router();
  const userService = new UserService(connection);
  Router.get("/", async (req, res) => {
    try {
      const allVotes = await userService.getAll();

      res.json({
        data: allVotes.reduce((acc, current) => {
          if (acc[current.vote.name]) {
            acc[current.vote.name]++;
          } else {
            acc[current.vote.name] = 1;
          }
          return acc;
        }, {}),
      });
    } catch (e) {
      console.log("Error getting tally");
      console.log(e);
      res.json({ data: null });
    }
  });

  return Router;
};
