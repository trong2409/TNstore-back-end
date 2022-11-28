import mongoose from "mongoose";

const productschema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  originalPrice: {
    type: String,
    require: true,
  },
  promotionPercent: {
    type: String,
    require: true,
  },
  saled: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
});

export default mongoose.model("products", productschema);
``;
