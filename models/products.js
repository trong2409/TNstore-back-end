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
    type: Number,
    require: true,
  },
  promotionPercent: {
    type: Number,
    require: true,
  },
  saled: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("products", productschema);
``;
