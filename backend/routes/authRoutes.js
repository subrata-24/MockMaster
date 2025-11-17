import express from "express";
import { signUp } from "../controllers/authController.js";
import { upload } from "../middlewares/multer.js";

export const authrouter = express.Router();

authrouter.post("/sign-up", upload.single("image"), signUp);
