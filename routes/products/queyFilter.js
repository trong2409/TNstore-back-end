import ProductModel from "../../models/products.js";

export const queryId = async (req, res, next) => {
  const id = req.query.id || null;
  if (id)
    try {
      const product = await ProductModel.findById(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: "Not found" });
    }
  else next();
};

export const queryFilter = async (req, res, next) => {
  const condition = [];
  const category = req.query.category || null;
  const color = req.query.color || null;
  const oder = req.query.oder || "asc";

  if (category) condition.push({ category: category });
  if (color) condition.push({ color: color });
  try {
    if (condition.length > 0)
      req.queryResult = await ProductModel.find()
        .and(condition)
        .sort({ originalPrice: oder });
    else
      req.queryResult = await ProductModel.find().sort({ originalPrice: oder });
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
