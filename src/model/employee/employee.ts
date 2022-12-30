import mongoose from "mongoose";
import { Designation } from "../../../enums/enums";

const employeeSchema = new mongoose.Schema({
  unitid: {
    type: String,
    required: [true, "Please provide the unit id"],
    unique: false,
    trim: true,
  },
  empid: {
    type: String,
    unique: true,
    trim: true,
  },
  designation: {
    type: String,
    required: [true, "Please provide the designation"],
    enum: [Designation.EMPLOYEE, Designation.SUPERVISOR],
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide the first_name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide the last_name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide the email address"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide the email address"],
    trim: true,
  },
});

export const Employee = mongoose.model("Employee", employeeSchema);
