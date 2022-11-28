import express from "express";
import path from "path";
import ProductModel from "../../models/products.js";
import { upload } from "./uploadImage.js";
import { inputValidate } from "./validate.js";

const router = express.Router();
const rootDir = path.resolve("./");

// Get imgae
router.get("/:image", (req, res) => {
  res.sendFile(rootDir + `/images/${req.params.image}`);
  console.log(rootDir + `/images/${req.params.image}`);
});

// Upload product
router.post("/", inputValidate, upload.single("image"), async (req, res) => {
  // const productExisted = await ProductModel.find({
  //   title: req.body.title,
  //   color: req.body.color,
  //   size: req.body.size,
  // });
  // if (productExisted)
  //   return res.status(400).json({ message: "Product is existed" });
  try {
    const productCreated = await ProductModel({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: process.env.URL + `/api/products/${req.image}`,
      originalPrice: req.body.originalPrice,
      promotionPercent: req.body.promotionPercent,
      saled: req.body.saled,
      quantity: req.body.quantity,
      color: req.body.color,
      size: req.body.color.size,
    }).save();
    res.status(200).json(productCreated);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
