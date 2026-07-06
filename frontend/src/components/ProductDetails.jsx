import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem("token");

  // OPTIMIZATION: Decode JWT token only when token changes, not on every render
  const currentUserId = useMemo(() => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (e) {
      console.error("Invalid token");
      return null;
    }
  }, [token]);

  // Fetch single product
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, BASE_URL]);

  // Fetch related products
  useEffect(() => {
    async function fetchRelated() {
      if (!product?.category || !product?._id) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/products`, {
          params: { category: product.category },
        });
        const filtered = res.data.data.filter(
          (item) => item._id !== product._id
        );
        setRelatedProducts(filtered.slice(0, 3));
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    }
    fetchRelated();
    // OPTIMIZATION: Depend on specific values instead of the entire object
  }, [product?._id, product?.category, BASE_URL]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product deleted successfully");
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // FIX: Validate size selection if sizes are available
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/cart`,
        {
          productId: product._id,
          quantity: quantity,
          size: selectedSize, // FIX: Pass selected size to the backend
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-pulse text-left">
        {/* ... (Your existing skeleton UI remains identical) ... */}
        <div className="h-4 w-48 bg-gray-200 rounded mb-8" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="aspect-[3/4] w-full bg-gray-200 rounded-3xl" />
          <div className="flex flex-col gap-6">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-10 w-5/6 bg-gray-200 rounded" />
            <div className="h-24 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-text-main font-serif">Product Not Found</h2>
        <p className="text-text-muted mt-2">The product you are looking for does not exist.</p>
        <Link to="/products" className="mt-6 inline-block px-6 py-2.5 bg-primary-nav text-white rounded-xl font-semibold hover:bg-accent transition">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isAvailable = product.stock > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 text-left">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted mb-8" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary-nav transition">Home</Link>
        <span className="text-border-color">/</span>
        <Link to="/products" className="hover:text-primary-nav transition">Products</Link>
        <span className="text-border-color">/</span>
        <span className="text-text-muted">{product.category}</span>
        <span className="text-border-color">/</span>
        <span className="text-text-main truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Column: Product Image */}
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-bg-card border border-border-color group shadow-md hover:shadow-xl transition-all duration-500">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        </div>

        {/* Right Column: Product Core Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-bg-card border border-border-color text-primary-nav text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
              {product.category}
            </span>
            <span className="text-xs font-bold text-text-muted">
              Brand: <span className="text-text-main">{product.brand || "VogueGen Signature"}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-main tracking-tight leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating & Stock Status */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200/60">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-md text-xs font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>{product.rating || "4.8"}</span>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${isAvailable ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-red-50 text-red-700 border border-red-200/50"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
              {isAvailable ? `${product.stock} in stock` : "Out of Stock"}
            </span>
          </div>

          {/* Price Block */}
          <div className="mb-6">
            <span className="text-3xl md:text-4xl font-extrabold text-primary-nav tracking-tight">₹{product.price}</span>
            <p className="text-xs text-text-muted mt-1">Inclusive of all duties and local sales taxes.</p>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-extrabold uppercase text-text-main tracking-wider">Select Size</h4>
                <a href="#size-chart" className="text-xs font-semibold text-primary-nav hover:underline">Size Chart</a>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-12 px-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-primary-nav border-primary-nav text-white shadow-md shadow-primary-nav/20"
                        : "bg-white border-border-color text-text-main hover:border-primary-nav hover:text-primary-nav"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold uppercase text-text-main tracking-wider mb-3">Quantity</h4>
            <div className="flex items-center w-fit border border-border-color rounded-xl bg-white p-1">
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="w-9 h-9 rounded-lg hover:bg-bg-page text-text-main font-bold flex items-center justify-center transition">－</button>
              <span className="w-12 text-center font-bold text-sm text-text-main">{quantity}</span>
              <button onClick={() => setQuantity((prev) => Math.min(product.stock || 10, prev + 1))} className="w-9 h-9 rounded-lg hover:bg-bg-page text-text-main font-bold flex items-center justify-center transition">＋</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${
                isAvailable ? "bg-primary-nav hover:bg-accent text-white shadow-md shadow-primary-nav/15 hover:shadow-lg hover:-translate-y-0.5" : "bg-text-muted text-white cursor-not-allowed opacity-60"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>ADD TO CART</span>
            </button>

            <button
              disabled={!isAvailable} // FIX: Changed from disabled={isAvailable}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${
                isAvailable ? "bg-accent hover:bg-primary-nav text-white shadow-md hover:shadow-lg hover:-translate-y-0.5" : "bg-transparent border border-border-color text-text-muted cursor-not-allowed opacity-60"
              }`}
            >
              <span>BUY IT NOW</span>
            </button>
          </div>

          {/* Admin Management Actions */}
          {currentUserId === product.user && (
            <div className="flex gap-3 mb-8">
              <Link to={`/update-product/${id}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-primary-nav/20 bg-primary-nav/5 text-primary-nav font-semibold hover:bg-primary-nav hover:text-white transition-all duration-300">
                ✏️ Edit Product
              </Link>
              <button onClick={handleDelete} className="flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 rounded-2xl border border-red-200 bg-white text-red-600 font-semibold hover:bg-red-50 transition-all duration-300">
                🗑️ Delete Product
              </button>
            </div>
          )}

          {/* Description / Shipping Tabs */}
          <div className="border border-border-color rounded-2xl overflow-hidden bg-white">
            <div className="flex border-b border-border-color bg-bg-page/40">
              <button onClick={() => setActiveTab("description")} className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 ${activeTab === "description" ? "border-primary-nav text-primary-nav bg-white" : "border-transparent text-text-muted"}`}>
                Description
              </button>
              <button onClick={() => setActiveTab("shipping")} className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 ${activeTab === "shipping" ? "border-primary-nav text-primary-nav bg-white" : "border-transparent text-text-muted"}`}>
                Shipping
              </button>
            </div>
            <div className="p-5 text-sm leading-relaxed text-text-muted">
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "shipping" && <p>Enjoy free carbon-neutral shipping on orders over ₹2,000. Delivery arrives in 3–5 business days. Free returns within 14 days.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="font-serif text-2xl font-bold text-text-main mb-6">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item._id} to={`/products/${item._id}`} className="bg-white border border-border-color rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-left">
                <div className="aspect-[4/5] bg-bg-card overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-extrabold uppercase text-accent">{item.category}</span>
                  <h4 className="font-semibold text-sm text-text-main group-hover:text-primary-nav transition-colors mt-1 mb-1 truncate">{item.name}</h4>
                  <span className="font-extrabold text-sm text-primary-nav">₹{item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;