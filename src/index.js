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

const app = express();
dotenv.config();
// middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors({
  origin: "https://hoa-tuoi-si.onrender.com"
}));

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

app.listen(PORT, () => {
  console.log(`Project running port ${PORT}`);
});

