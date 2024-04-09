import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // Assuming an array of image URLs
      required: true,
    },
  }, 
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Producter", productSchema);
export default Product;
