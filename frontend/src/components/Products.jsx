import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// Import Lucide icons
import { 
  Search, 
  Layers, 
  ChevronDown, 
  Footprints, 
  ShoppingBag, 
  Gem, 
  User, 
  Shirt, 
  Monitor, 
  Folder, 
  ArrowUpDown,
  Plus
} from "lucide-react";

// 1. Precise, category-specific mappings using Lucide component types
const categoryIcons = {
  "shoes": Footprints,
  "bags": ShoppingBag,
  "bag": ShoppingBag,
  "accessories": Gem,
  "women": User,
  "girls": User,
  "men": Shirt,
  "electronics": Monitor
};

// 2. Optimized helper function to return the matching Lucide component
const getCategoryIcon = (catName) => {
  if (!catName) return <Layers className="w-4 h-4" />;
  const key = catName.toLowerCase().trim();
  
  const IconComponent = categoryIcons[key] || Folder;
  return <IconComponent className="w-4 h-4" />;
};

function Products() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`, {
        params: { search: debouncedSearch, category, sort },
      });
      setProduct(res.data.data);
      setLoading(false);
      if (categories.length === 0) {
        setCategories([...new Set(res.data.data.map((item) => item.category))]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category, sort]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F7F9FC]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#185FA5]"></div>
        <p className="mt-4 text-base font-medium text-gray-500">Loading listed records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 font-sans antialiased text-gray-800">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200/80 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#185FA5] tracking-tight">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage, discover, and monitor listed inventory records in real-time.
          </p>
        </div>
        {token && (
          <Link
            to="/add-product"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#185FA5] hover:bg-[#144F8A] text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 active:scale-98 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Create New Product
          </Link>
        )}
      </div>

      {/* Filter Layout Elements */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search products by title or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#185FA5]/15 focus:border-[#185FA5] shadow-sm text-sm text-gray-800 transition-all duration-200"
          />
        </div>

        {/* CUSTOM CATEGORY DROPDOWN CONTAINER */}
        <div className="relative w-full md:w-64" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-full bg-white border border-gray-200 pl-4 pr-10 py-3 rounded-xl flex items-center gap-3 text-sm text-gray-700 font-medium shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#185FA5]/15 focus:border-[#185FA5]"
          >
            <span className="text-gray-400">
              {getCategoryIcon(category)}
            </span>
            <span className="truncate">{category || "All Categories"}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 pointer-events-none">
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </span>
          </button>

          {/* Dropped Element Context Panel -> Fixed rendering on top via z-50 and explicit border shadow */}
          {isOpen && (
            <div className="absolute left-0 right-0 z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto py-1.5 focus:outline-none animate-in fade-in slide-in-from-top-1 duration-100">
              <button
                type="button"
                onClick={() => { setCategory(""); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${category === "" ? "bg-blue-50/60 text-[#185FA5] font-semibold" : "text-gray-600"}`}
              >
                <span className="text-gray-400">
                  <Layers className="w-4 h-4" />
                </span>
                All Categories
              </button>

              <div className="my-1 border-t border-gray-100"></div>

              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setCategory(cat); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${category === cat ? "bg-blue-50/60 text-[#185FA5] font-semibold" : "text-gray-600"}`}
                >
                  <span className={category === cat ? "text-[#185FA5]" : "text-gray-400"}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span className="truncate">{cat}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Dropdown Selector */}
        <div className="relative w-full md:w-56">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <ArrowUpDown className="w-4 h-4" />
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-white border border-gray-200 pl-11 pr-10 py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#185FA5]/15 focus:border-[#185FA5] shadow-sm text-sm text-gray-700 font-medium transition-all duration-200 cursor-pointer"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price Low → High</option>
            <option value="price-desc">Price High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Grid Layout Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
        {product.map((prod) => (
          <Link to={`/products/${prod._id}`} key={prod._id} className="block group group-hover:no-underline">
            <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:-translate-y-0.5">
              {/* Image Frame Wrapper */}
              <div className="relative overflow-hidden w-full h-64 bg-gray-50 border-b border-gray-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Contents Frame Wrapper */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {getCategoryIcon(prod.category)}
                    {prod.category}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-[#185FA5] transition-colors duration-200 line-clamp-1">
                  {prod.name}
                </h2>

                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                  {prod.description}
                </p>

                {/* Card Action Footer Row */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-[#185FA5] group-hover:underline">
                    View Details
                  </span>
                  <span className="text-xl font-black text-gray-900">
                    ₹{prod.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State Fallback Screen */}
      {product.length === 0 && (
        <div className="max-w-6xl mx-auto mt-12 p-12 text-center bg-white rounded-2xl border border-gray-200/60 shadow-sm">
          <Folder className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-700">No Inventory Records Found</h3>
          <p className="text-xs text-gray-400 mt-1">Try broadening your parameters or editing search query strings.</p>
        </div>
      )}
    </div>
  );
}

export default Products;