import mongoose from "mongoose";

import { orderReqStatus } from "../../../enums/enums";

const orderReqSchema = new mongoose.Schema({
  reqid: {
    type: String,
    required: [true, "Please provide the job id"],
    unique: true,
    trim: true,
  },
  unitid: {
    type: String,
    required: [true, "Please provide the job id"],
    trim: true,
  },
  reqStatus: {
    type: String,
    trim: true,
    default: orderReqStatus.CREATED,
  },
  materialid: {
    type: String,
    required: [true, "Please provide the materialid"],
    trim: true,
  },
  availableQty: {
    type: Number,
    required: [true, "Please provide the availableQty"],
    trim: true,
  },
  requestedQty: {
    type: Number,
    trim: true,
  },
  pricePerUnit: {
    type: Number,
    trim: true,
  },
  sentToPurchase: {
    type: Boolean,
    default: false,
  },
  requestedDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const OrderReq = mongoose.model("OrderReq", orderReqSchema);
