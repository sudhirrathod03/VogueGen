import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: String,
    brand: String,
    price: Number,
    rating: Number,
    stock: Number,
    image: String,
    description: String,
    colors: [String],
    sizes: [String],
    sku: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;