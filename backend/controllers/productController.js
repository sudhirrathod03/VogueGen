import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    console.log(req.user);
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
      user: req.user.id,
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
    console.log(newProduct);

    const saveProduct = await newProduct.save();
    res.status(201).json({ success: true, data: saveProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// To get all the products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res
//       .status(200)
//       .json({ success: true, count: products.length, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let filter = {};

    // Search
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category Filter
    if (category) {
      filter.category = category;
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === "price-asc") {
      query = query.sort({ price: 1 });
    }

    if (sort === "price-desc") {
      query = query.sort({ price: -1 });
    }

    if (sort === "rating") {
      query = query.sort({ rating: -1 });
    }

    const products = await query;

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// To get single product by ID
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

// To update product
export const updateProduct = async (req, res) => {
  try {
    Object.assign(req.product, req.body);

    const updatedProduct = await req.product.save();

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// To delete product
export const deleteProduct = async (req, res) => {
  try {
    await req.product.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
