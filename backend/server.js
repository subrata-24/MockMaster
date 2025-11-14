import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

//built-in middleware to understand and parse json JSON data sent from the client
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //allows sending cookies, authorization headers, etc., with requests
  })
);

app.get("/", (req, res) => {
  res.send("Hello vaiya");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
