import express from "express";
import { Connection } from "typeorm";

import { UserService } from "../../services/user/userService";

export const VoteRouter = (connection: Connection) => {
  const Router = express.Router();
  const userService = new UserService(connection);
  Router.get("/", async (req, res) => {
    try {
      const allVotes = await userService.getAll();
      res.json({
        data: allVotes,
      });
    } catch (e) {
      console.log("Error getting all users");
      console.log(e);
      res.json({ data: null });
    }
  });

  Router.post("/", async (req, res) => {
    console.log("what is req.session?");
    console.log(req.session);
    // @ts-ignore
    if (req.body.user === req.session.user) {
      res.json({
        message: "You already voted",
      });
    } else {
      // @ts-ignore
      req.session.user = req.body.user;
      await userService.add(req.body);
      res.json({
        message: "ok",
      });
    }
  });

  return Router;
};
