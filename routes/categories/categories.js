import express from "express";
import CategoriesModel from "../../models/categories.js";
import { inputValidate } from "./validate.js";

const router = express.Router();

// Get all caterogies
router.get("/", async (req, res) => {
  try {
    const categories = await CategoriesModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get specific category by id
router.get("/:id", async (req, res) => {
  try {
    const categories = await CategoriesModel.find({ _id: req.params.id });
    if (categories.length === 0) throw "err";
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: "Not found" });
  }
});

// Create new category
router.post("/", inputValidate, async (req, res) => {
  const categoryExist = await CategoriesModel.findOne({ name: req.body.name });
  if (categoryExist)
    return res.status(400).json({ message: "Category name is existed" });

  try {
    const category = await CategoriesModel({
      name: req.body.name,
      products: [],
    }).save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update category with id
router.put("/:id", inputValidate, async (req, res) => {
  const categoryExist = await CategoriesModel.findOne({ name: req.body.name });
  if (categoryExist)
    return res.status(400).json({ message: "Category name is existed" });

  try {
    const categoryUpdated = await CategoriesModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { returnDocument: "after" }
    );
    res.status(200).json(categoryUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete category with id
router.delete("/:id", async (req, res) => {
  try {
    const categoryDeleted = await CategoriesModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(categoryDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
