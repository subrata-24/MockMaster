import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { authrouter } from "./routes/authRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //allows sending cookies, authorization headers, etc., with requests
  })
);

//built-in middleware to understand and parse json JSON data sent from the client
app.use(express.json());

//cookie-parser is used to read and parse cookies sent from the client (browser) to your server. It converts the Cookie header into a JavaScript object that can be easily access via req.cookies.
app.use(cookieParser());
app.use("/api/auth", authrouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
