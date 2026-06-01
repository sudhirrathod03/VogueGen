import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    
  }
};

export default connectDB;