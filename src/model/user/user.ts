import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide the email address"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minlength: 8,
    select: false,
  },
  dept: {
    type: String,
    required: [true, "Please provide a valid department"],
  },
  deptid: {
    type: String,
    required: [true, "Please provide a valid department id"],
  },
});

// hashing the password when creating a new user
userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 9);

  next();
});

// validate user entered password
userSchema.methods.checkPassword = async function (
  candidatePassword: String,
  userPassword: String
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model("User", userSchema);
