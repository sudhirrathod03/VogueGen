import express from "express";

const router = express.Router();

import {createProduct , getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/productController.js";


router.route("/")
.post(createProduct)
.get(getProducts);


router.route("/:id")
.get(getProductById)
.put(updateProduct)
.delete(deleteProduct);

export default router;