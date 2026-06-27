import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
   const BASE_URL= import.meta.env.VITE_BACKEND_URL

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    rating: "",
    stock: "",
    image: "",
    description: "",
    sizes: "",
  });

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        const product = res.data.data;

        setFormData({
          name: product.name || "",
          category: product.category || "",
          brand: product.brand || "",
          price: product.price || "",
          rating: product.rating || "",
          stock: product.stock || "",
          image: product.image || "",
          description: product.description || "",
          sizes: product.sizes ? product.sizes.join(", ") : "",
        });
        setError("");
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
        console.log("Api Request Completed");
      }
    };
    fetchProduct();
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!formData.brand.trim()) {
      setError("Brand is required.");
      return;
    }

    if (formData.price === "" || isNaN(formData.price) || Number(formData.price) <= 0) {
      setError("Price must be a valid number greater than 0.");
      return;
    }

    if (formData.stock === "" || isNaN(formData.stock) || Number(formData.stock) < 0) {
      setError("Stock Quantity cannot be a negative number.");
      return;
    }

    if (formData.rating !== "") {
      const ratingNum = Number(formData.rating);
      if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
        setError("Rating must be a number between 0 and 5.");
        return;
      }
    }

    if (!formData.image.trim()) {
      setError("Image URL is required.");
      return;
    }

    if (!formData.sizes.trim()) {
      setError("Please provide at least one size (e.g., S, M, L).");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required.");
      return;
    }
    

    const updatedProductData = {
      ...formData,
      price: formData.price !== "" ? Number(formData.price) : undefined,
      rating: formData.rating !== "" ? Number(formData.rating) : undefined,
      stock: formData.stock !== "" ? Number(formData.stock) : undefined,
      sizes: formData.sizes ? formData.sizes.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/products/${id}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Product updated successfully!");

      setTimeout(() => {
        navigate(`/products/${id}`);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while updating.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium text-sm">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 my-6">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Update Product</h2>
        <p className="text-sm text-gray-500 mt-1">Modify the specifications and inventory details below.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-center font-medium shadow-sm">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-sm flex items-center font-medium shadow-sm">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
       
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none"
            placeholder="e.g. Premium Cotton Jacket"
          />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none"
              placeholder="e.g. Apparel"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none"
              placeholder="e.g. VogueGen"
            />
          </div>
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Price (₹)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 pl-8 text-sm text-gray-900 shadow-sm transition outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Rating (0-5)</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none"
              placeholder="4.5"
            />
          </div>
        </div>

       
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none file:mr-4"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Sizes (Comma Separated)</label>
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none"
            placeholder="S, M, L, XL"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-xl p-3 text-sm text-gray-900 shadow-sm transition outline-none resize-none"
            placeholder="Write clear details about item features, materials, and metrics..."
          />
        </div>

        <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100 mt-6">
          <button
            type="button"
            onClick={() => navigate(`/products/${id}`)}
            className="px-5 py-2.5 border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 active:bg-gray-100 shadow-sm transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;