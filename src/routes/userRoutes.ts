import express from "express";
import { UserController } from "../controllers/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signUpEndpoint);
userRouter.post("/login", userController.loginEndpoint);
