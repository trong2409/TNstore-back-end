import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("categories", categoriesSchema);
