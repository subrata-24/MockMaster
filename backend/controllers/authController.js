import User from "../models/user.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import genToken from "../utils/token.js";
import { sendSignUpOTP } from "../utils/mailer.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Signup request received");
    console.log("File uploaded:", !!req.file);

    if (req.file) {
      console.log("File details:", {
        fieldname: req.file.fieldname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    }
    let imageUrl = null;
    if (req.file) {
      console.log("Uploading to Cloudinary...");
      imageUrl = await uploadOnCloudinary(req.file.path);

      if (!imageUrl) {
        console.error("Cloudinary upload returned null");
        return res.status(500).json({
          error: "Failed to upload image. Please try again.",
        });
      }

      console.log("✅ Cloudinary URL:", imageUrl);
    }
    let user = await User.findOne({ email });
    if (user && user.isEmailVerified) {
      return res.status(400).json({ message: "This user is already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      profileImageUrl: imageUrl,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    //When call res.cookie(), the server sends a Set-Cookie header in the HTTP response, and the browser automatically stores this data in cookie.
    res.cookie("token", token, {
      // secure: false - Cookie can be sent over HTTP (not just HTTPS).Set to true in production to ensure cookie is only sent over HTTPS for security
      secure: false,
      // sameSite: "strict" - Prevents CSRF (Cross-Site Request Forgery) attacks.The cookie will only be sent with requests from the same site.Options: "strict" (most secure), "lax" (default), "none" (least secure, requires secure: true)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // httpOnly: true - The cookie cannot be accessed via JavaScript (document.cookie).This protects against XSS (Cross-Site Scripting) attacks.Only the server can read this cookie, making it more secure
      httpOnly: true,
    });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendSignUpOTP({ to: email, otp });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`Sign up error ${error}`);
  }
};

export const verifySignUpOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.userId;
    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User is not found" });
    }
    if (user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ error: "OTP is expired.Request for new OTP" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ error: "You entered a invalid OTP" });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    user.isEmailVerified = true;
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
};
