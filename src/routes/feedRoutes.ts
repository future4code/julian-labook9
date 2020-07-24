import express from "express";
import { FeedController } from "../controllers/FeedController";

export const feedRouter = express.Router();

const feedController = new FeedController();

feedRouter.post("/post", feedController.feedEndpoint);
feedRouter.get("/:type", feedController.feedEndpoint);
feedRouter.post("/create", feedController.createPostEndpoint);