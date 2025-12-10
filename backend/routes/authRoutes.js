import express from "express";
import {
  login,
  resendSignUpOTP,
  sendOTPtoEmail,
  signOut,
  signUp,
  verifyForgetOTP,
  verifyPassword,
  verifySignUpOTP,
} from "../controllers/authController.js";
import { upload } from "../middlewares/multer.js";
import isAuth from "../middlewares/authMiddleware.js";

export const authrouter = express.Router();

authrouter.post("/sign-up", upload.single("image"), signUp);
authrouter.post("/verify-signup-otp", isAuth, verifySignUpOTP);
authrouter.post("/login", login);
authrouter.get("/sign-out", isAuth, signOut);
authrouter.post("/resend-sign-up-otp", isAuth, resendSignUpOTP);
authrouter.post("/forget-passowrd-otp", sendOTPtoEmail);
authrouter.post("/verify-forget-otp", verifyForgetOTP);
authrouter.post("/confirm-password", verifyPassword);
