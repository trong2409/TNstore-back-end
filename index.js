import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/users.js";
import OderRoute from "./routes/oders.js";
import ProductRoute from "./routes/products/products.js";
import CategoriesRoute from "./routes/categories/categories.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
// Route
app.use("/api/users/", UserRoute);
app.use("/api/oders/", OderRoute);
app.use("/api/products/", ProductRoute);
app.use("/api/categories", CategoriesRoute);
// Connect DB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server start at ${PORT}`);
});
