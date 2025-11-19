import express from "express";
import isAuth from "../middlewares/authMiddleware.js";
import { currentUser } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.get("/get-current-user", isAuth, currentUser);
