import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectMongoDB from "./config/db";
import user from "./routers/user";
import color from "./routers/color";
import delivery from "./routers/delivery";
import category from "./routers/category";
import order from "./routers/order";

const app = express();
dotenv.config();
// middleware)
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
const dbURL = process.env.DB_URI

console.log(dbURL);

connectMongoDB(dbURL);
// mongodb+srv://vinsomatem97:vinsomatem97@mlb.jo6kt.mongodb.net/?retryWrites=true&w=majority&appName=MLB
// routers
app.use("/api", user);
app.use("/api", color);
app.use("/api", delivery);
app.use("/api", category);
app.use("/api", order);

export const viteNodeApp = app;
