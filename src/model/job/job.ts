import mongoose from "mongoose";
import { NextFunction } from "express";

const jobSchema = new mongoose.Schema({
  jobid: {
    type: String,
    required: [true, "Please provide the job id"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  unitid: {
    type: String,
    required: [true, "Please provide the unit id"],
    unique: false,
    trim: true,
  },
  empid: {
    type: String,
    unique: false,
    trim: true,
  },
  expectedStartDate: {
    type: Date,
    required: [true, "Please provide a valid Date"],
  },
  expectedFinishDate: {
    type: Date,
    required: [true, "Please provide a valid Date"],
  },
  actualStartDate: {
    type: Date,
  },
  actualFinishDate: {
    type: Date,
  },
  allocatedHours: {
    type: Number,
    required: [true, "Please provide a valid allocated Hours"],
  },
  description: {
    type: String,
    required: [true, "Please provide a valid description"],
  },
  status: {
    type: String,
  },
});

export const Job = mongoose.model("Job", jobSchema);
