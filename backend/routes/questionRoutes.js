import express from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {
  addNote,
  addQuestions,
  togglePinQuestion,
} from "../controllers/questionController.js";

export const questionRoutes = express.Router();

questionRoutes.post("/add-question", isAuth, addQuestions);
questionRoutes.post("/:id/pin", isAuth, togglePinQuestion);
questionRoutes.post("/:id/note", isAuth, addNote);
