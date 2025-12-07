import express from "express";
import isAuth from "../middlewares/authMiddleware.js";
import {
  createSession,
  deleteSessionById,
  getMyAllSession,
  getSessionById,
} from "../controllers/sessionController.js";

export const sessionRouter = express.Router();
sessionRouter.post("/create-session", isAuth, createSession);
sessionRouter.get("/get-all-sessions", isAuth, getMyAllSession);
sessionRouter.get("/get-session-by-id/:id", isAuth, getSessionById);
sessionRouter.delete("/delete-session-by-id/:id", isAuth, deleteSessionById);
