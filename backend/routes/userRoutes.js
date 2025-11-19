import express from "express";
import isAuth from "../middlewares/authMiddleware";
import { currentUser } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/get-current-user", isAuth, currentUser);
