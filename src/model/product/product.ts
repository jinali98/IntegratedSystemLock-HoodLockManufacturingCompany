import mongoose from "mongoose";
import { NextFunction } from "express";

const productSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: [true, "Please provide the product id"],
    unique: true,
    trim: true,
  },
  productName: {
    type: String,
    required: [true, "Please provide a valid productName"],
  },
  productDescription: {
    type: String,
    required: [true, "Please provide a valid description"],
  },
});

export const Product = mongoose.model("Product", productSchema);
