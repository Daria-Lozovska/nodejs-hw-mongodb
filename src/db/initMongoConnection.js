import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("Mongo connection error:", error.message);
    process.exit(1);
  }
};

export default initMongoConnection;
