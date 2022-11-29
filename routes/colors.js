import express from "express";
import ColorsModel from "../models/colors.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const colors = await ColorsModel.find();
    res.status(200).json(colors);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const colorExisted = await ColorsModel.findOne({ name: req.body.name });
  if (colorExisted)
    return res.status(400).json({ message: "Color is existed" });

  try {
    const color = await ColorsModel({ name: req.body.name }).save();
    res.status(200).json(color);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const color = await ColorsModel.findByIdAndDelete(req.params.id);
    res.status(200).json(color);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
