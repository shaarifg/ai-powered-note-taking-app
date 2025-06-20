import mongoose from "mongoose";
import { baseModelPlugin } from "../config/database.config.js";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
});

userSchema.plugin(baseModelPlugin);

export default mongoose.model("User", userSchema);
