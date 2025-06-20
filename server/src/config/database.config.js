import mongoose from "mongoose";
import config from "./app.config.js";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(config.database.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

//to add createdAt, updatedAt and isActive in all the schemas
export const baseModelPlugin = (schema) => {
  schema.add({
    isActive: {
      type: Boolean,
      default: true,
    },
  });

  schema.set("timestamps", true);
};

export default connectToDB;
