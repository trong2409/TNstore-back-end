import express from "express";
import path from "path";
import multer from "multer";
import ProductModel from "../../models/products.js";
import CategoryModel from "../../models/categories.js";
import ColorsModel from "../../models/colors.js";

import { inputValidate, existedValid, storeImage } from "./validate.js";
import { queryId, queryFilter } from "./queyFilter.js";

const router = express.Router();
const rootDir = path.resolve("./");
const upload = multer();

// Get imgae product
router.get("/image/:image", (req, res) => {
  res.sendFile(rootDir + `/images/${req.params.image}`);
});

// Get specific product
//  /?id=12313asd&oder=asc
router.get("/", queryId, queryFilter, async (req, res) => {
  const size = 9;
  const page = req.query.page || 1;
  const totalPage =
    req.queryResult.length / size > Math.floor(req.queryResult.length / size)
      ? Math.floor(req.queryResult.length / size) + 1
      : Math.floor(req.queryResult.length / size);
  if (page > totalPage)
    return res
      .status(400)
      .json({
        message: "Page is bigger than total page",
        page: page,
        totalPage: totalPage,
      });
  const start = size * (page - 1) > 0 ? size * (page - 1) : 0;
  const end =
    size * (page - 1) + size >= req.queryResult.length
      ? req.queryResult.length - 1
      : size * (page - 1) + size;
  const result = req.queryResult.slice(start, end);
  res.json({
    data: result,
    page: page,
    totalPage: totalPage,
    totalProducts: req.queryResult.length,
  });
});

// Create new product
router.post(
  "/",
  upload.single("image"),
  inputValidate,
  existedValid,
  storeImage,
  async (req, res) => {
    try {
      const productCreated = await ProductModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: process.env.URL + `/api/products/image/${req.image}`,
        originalPrice: req.body.originalPrice,
        promotionPercent: req.body.promotionPercent,
        saled: req.body.saled,
        quantity: req.body.quantity,
        color: req.body.color,
      }).save();
      res.status(200).json(productCreated);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.post("/random", async (req, res) => {
  const category = await CategoryModel.find();
  const color = await ColorsModel.find();

  for (let i = 0; i < 100; i++) {
    const randomCategory = category[Math.floor(Math.random() * 4)];
    const randomColor = color[Math.floor(Math.random() * 6)];

    const product = await ProductModel({
      title: `${randomCategory.name}-${Date.now()}`,
      description: "Test",
      category: randomCategory._id,
      image: "http://localhost:3001/api/products/image/image-1669692931377.jpg",
      originalPrice: Math.floor(Math.random() * 1000),
      promotionPercent: 20,
      saled: 10,
      quantity: 100,
      color: randomColor._id,
    }).save();
  }
  res.send("ok");
});

export default router;
