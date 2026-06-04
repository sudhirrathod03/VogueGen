import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
