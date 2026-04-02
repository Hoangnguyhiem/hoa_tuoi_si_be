import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectMongoDB from "./config/db.js";
import user from "./routers/user.js";
import color from "./routers/color.js";
import delivery from "./routers/delivery.js";
import category from "./routers/category.js";
import order from "./routers/order.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
// middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// connect db
const { DB_URI , PORT } = process.env;

connectMongoDB(DB_URI);
// mongodb+srv://vinsomatem97:vinsomatem97@mlb.jo6kt.mongodb.net/?retryWrites=true&w=majority&appName=MLB
// routers
app.use("/api", user);
app.use("/api", color);
app.use("/api", delivery);
app.use("/api", category);
app.use("/api", order);

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static React
app.use(express.static(path.join(__dirname, "../dist")));

// fallback React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Project running port ${PORT}`);
});

