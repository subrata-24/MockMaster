import express from "express";
import isAuth from "../middlewares/authMiddleware.js";
import { generateInterviewsQuestion } from "../controllers/aiController.js";

export const aiRouter = express.Router();
aiRouter.post("/question-answer", isAuth, generateInterviewsQuestion);
