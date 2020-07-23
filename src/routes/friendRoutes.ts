import express from "express";
import { FriendController } from "../controller/FriendController";

export const friendRouter = express.Router();

const friendController = new FriendController();

friendRouter.post("/add-friend", friendController.addFriendEndpoint);
friendRouter.post("/undo-friendship", friendController.undoFriendshipEndpoint);