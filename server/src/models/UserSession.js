import mongoose from "mongoose";
import { baseModelPlugin } from "../config/database.config.js";

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  ipAddress: String,
  deviceType: String,
  userAgent: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSessionSchema.plugin(baseModelPlugin);

export default mongoose.model("UserSession", userSessionSchema);
