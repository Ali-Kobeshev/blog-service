import express from "express";
import identityRouter from "./routes/identity";
import profileRouter from "./routes/profile";
import { errorMiddleware } from "./middlewares/error-middleware";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";

export const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
   res.json("Entered to server");
});

app.use("/identity", identityRouter);
app.use("/profile", profileRouter);
app.use(errorMiddleware);
