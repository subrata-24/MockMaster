import express from "express";
import { signUp } from "../controllers/authController";

export const authrouter = express.Router();

authrouter.post("/sign-up", signUp);
