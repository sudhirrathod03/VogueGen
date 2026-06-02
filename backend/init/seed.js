import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import products from "./data.js";


dotenv.config({ path: "../.env" });

const seedDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
      throw new Error("DATABASE_URL is missing from your .env file!");
    }

    await mongoose.connect(dbUrl);

    await Product.deleteMany({});

    await Product.collection.dropIndexes();
    
    await Product.insertMany(products);
    console.log("Data Inserted Successfully");
  } catch (err) {
    console.log("Failed to insert Data", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed.");
    process.exit(0);
  }
};

seedDB();
