import Product from "../models/Product.js";

// To create new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      price,
      rating,
      stock,
      image,
      description,
      sizes,
    } = req.body;
    const newProduct = new Product({
      name,
      category,
      brand,
      price,
      rating,
      stock,
      image,
      description,
      sizes,
    });

    const saveProduct = await newProduct.save();
    res.status(201).json({ success: true, data: saveProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// To get all the products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// to get the single product using id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// To update the product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// To delete the product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
