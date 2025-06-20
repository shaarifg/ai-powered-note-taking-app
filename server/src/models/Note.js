import mongoose from "mongoose";
import { baseModelPlugin } from "../config/database.config.js";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: Object,
    default: {},
  },
  orderIndex: {
    type: Number,
    required: true,
  },
});

noteSchema.plugin(baseModelPlugin);

export default mongoose.model("Note", noteSchema);
