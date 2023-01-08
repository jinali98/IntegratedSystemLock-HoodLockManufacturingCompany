import mongoose from "mongoose";

const inventoryUnitSchema = new mongoose.Schema({
  materialid: {
    type: String,
    required: [true, "Please provide the  id"],
    trim: true,
  },
  unitid: {
    type: String,
    required: [true, "Please provide the  id"],
    trim: true,
  },
  availableQty: {
    type: Number,
    required: [true, "Please provide a valid Qty"],
  },
  lowLevelQty: {
    type: Number,
    required: [true, "Please provide a valid Qty"],
  },
});

export const InvenotryUnit = mongoose.model(
  "InvenotryUnit",
  inventoryUnitSchema
);
