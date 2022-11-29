import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import UserRoute from "./routes/users.js";
import OderRoute from "./routes/oders.js";
import ProductRoute from "./routes/products/products.js";
import CategoriesRoute from "./routes/categories/categories.js";
import ColorsRoute from "./routes/colors.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // Used to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Route
app.use("/api/users/", UserRoute);
app.use("/api/oders/", OderRoute);
app.use("/api/products/", ProductRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/colors", ColorsRoute);

// Connect DB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server start at ${PORT}`);
});
