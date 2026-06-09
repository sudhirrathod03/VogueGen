import protect from "../middleware/authMiddleware.js"
import isProductOwner from "../middleware/productOwner.js";
import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/")
  .post(protect, createProduct)
  .get(getProducts);

router.route("/:id")
  .get(getProductById)
  .put(protect, isProductOwner,updateProduct)
  .delete(protect,isProductOwner,deleteProduct);

export default router;