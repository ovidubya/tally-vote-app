import express from "express";
import { getManager, Connection } from "typeorm";
import { User } from "../../../database/entity/User";
import { Vote } from "../../../database/entity/Vote";
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
    // @ts-ignore
    if (req.body.user) {
      // if (req.body.user === req.session.user) { ORGINAL
      res.json({
        message: "You already voted",
      });
    } else {
      // @ts-ignore
      // req.session.user = req.body.user; ORGINAL
      await userService.add(req.body);
      res.json({
        message: "ok",
      });
    }
  });

  return Router;
};
