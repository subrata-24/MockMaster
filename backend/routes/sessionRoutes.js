import express from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {
  createSession,
  getMyAllSession,
} from "../controllers/sessionController.js";

export const sessionRouter = express.Router();
sessionRouter.post("/create-session", isAuth, createSession);
sessionRouter.get("/get-all-sessions", isAuth, getMyAllSession);
