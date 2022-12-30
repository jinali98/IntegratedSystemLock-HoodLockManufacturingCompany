import mongoose from "mongoose";
import { NextFunction } from "express";

const unitSchema = new mongoose.Schema({
  unitid: {
    type: String,
    required: [true, "Please provide the unit id"],
    unique: true,
    trim: true,
  },

  unitName: {
    type: String,
    required: [true, "Please provide a valid description"],
  },
});

export const Unit = mongoose.model("Unit", unitSchema);
