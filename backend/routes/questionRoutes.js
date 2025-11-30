import express from "express";
import isAuth from "../middlewares/authMiddleware";
import {
  addNote,
  addQuestions,
  togglePinQuestion,
} from "../controllers/questionController";

export const questionRoutes = express.Router();

questionRoutes.post("/add-question", isAuth, addQuestions);
questionRoutes.post("/:id/pin", isAuth, togglePinQuestion);
questionRoutes.post("/:id/note", isAuth, addNote);
