import Product from "../models/Product.js";

const isProductOwner = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    req.product = product;

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default isProductOwner;