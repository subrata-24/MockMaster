import express from "express";
import {
  login,
  sendOTPtoEmail,
  signOut,
  signUp,
  verifySignUpOTP,
} from "../controllers/authController.js";
import { upload } from "../middlewares/multer.js";
import isAuth from "../middlewares/authMiddleware.js";

export const authrouter = express.Router();

authrouter.post("/sign-up", upload.single("image"), signUp);
authrouter.post("/verify-signup-otp", isAuth, verifySignUpOTP);
authrouter.post("/login", login);
authrouter.get("/sign-out", signOut);
authrouter.post("/forget-passowrd-otp", sendOTPtoEmail);
