import express from "express";
import isAuth from "../middlewares/authMiddleware";
import { addQuestions } from "../controllers/questionController";

export const questionRoutes = express.Router();

questionRoutes.post("/add-question", isAuth, addQuestions);
