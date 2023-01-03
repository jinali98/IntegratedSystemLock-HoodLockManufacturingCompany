import mongoose from "mongoose";
import { NextFunction } from "express";

const inventorySchema = new mongoose.Schema({
  materialid: {
    type: String,
    required: [true, "Please provide the  id"],
    unique: true,
    trim: true,
  },
  materialName: {
    type: String,
    required: [true, "Please provide a valid Name"],
  },
});

export const Invenotry = mongoose.model("Invenotry", inventorySchema);
