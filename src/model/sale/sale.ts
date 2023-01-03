import mongoose from "mongoose";
import { NextFunction } from "express";

const saleSchema = new mongoose.Schema({
  saleid: {
    type: String,
    required: [true, "Please provide the unit id"],
    unique: true,
    trim: true,
  },
  productid: {
    type: String,
    required: [true, "Please provide the unit id"],
    trim: true,
  },

  totalSoldQty: {
    type: Number,
    required: [true, "Please provide total sold qty"],
  },
  pricePerUnit: {
    type: Number,
    required: [true, "Please provide pricePerUnit"],
  },
  periodStartDate: {
    type: Date,
    required: [true, "Please provide a periodStartDate"],
  },
  periodEndDate: {
    type: Date,
    required: [true, "Please provide a valid dperiodEndDate"],
  },
});

export const Sale = mongoose.model("sale", saleSchema);
