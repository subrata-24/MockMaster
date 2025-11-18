import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/*
    We create a token using jwt.sign(payload, secret) and store it in a cookie. The payload typically contains the userId. When a request is made from the frontend with withCredentials: true, the cookie (containing the token) is automatically sent to the backend.

    In this middleware:
        1. We extract the token from req.cookies
        2. Verify and decode the token using jwt.verify()
        3. Extract the userId from the decoded token
        4. Attach userId to the request object (req.userId)
        5. Pass control to the next middleware/controller

    This allows controllers to access req.userId to fetch user info from the database and provide authenticated responses.
*/
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodeToken) {
      return res.status(400).json({ message: "Token can not be decoded" });
    }
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(500).json(`Find error to authenticate user ${error}`);
  }
};

export default isAuth;
