import Joi from "joi";
import fs from "fs";
import path from "path";
import ProductModel from "../../models/products.js";

const rootDir = path.resolve("./");

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string(),
  originalPrice: Joi.number().required(),
  promotionPercent: Joi.number().required().default("0"),
  saled: Joi.number().default(10),
  quantity: Joi.number().required().default(10),
  color: Joi.string().required(),
});

export const inputValidate = async (req, res, next) => {
  try {
    const valid = await schema.validateAsync({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      originalPrice: req.body.originalPrice,
      promotionPercent: req.body.promotionPercent,
      saled: req.body.saled,
      quantity: req.body.quantity,
      color: req.body.color,
    });
    next();
  } catch (error) {
    res.status(400).send(error.details[0].message);
  }
};

export const existedValid = async (req, res, next) => {
  const productExisted = await ProductModel.where(
    "title",
    req.body.title
  ).where("color", req.body.color);
  if (productExisted.length > 0)
    return res.status(400).json({ message: "Product is existed" });
  next();
};

export const storeImage = async (req, res, next) => {
  const extend =
    req.file.originalname.split(".")[
      req.file.originalname.split(".").length - 1
    ];
  if (
    extend !== "png" &&
    extend !== "jpg" &&
    extend !== "gif" &&
    extend !== "jpeg"
  ) {
    return res.status.json({ message: "Only images are allowed" });
  }
  req.image = req.file.fieldname + "-" + Date.now() + "." + extend;
  fs.writeFile(
    path.join(rootDir, `/images/${req.image}`),
    req.file.buffer,
    (err) => {
      if (err) {
        return res.status(400).json(err);
      }
    }
  );
  next();
};
