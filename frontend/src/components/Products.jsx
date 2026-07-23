import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search input
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

  const sortOptions = [
    { value: "", label: "Default Sort" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const getSortLabel = (currentSort) => {
    const option = sortOptions.find(opt => opt.value === currentSort);
    return option ? option.label : "Sort By";
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-gray-900 transition-colors duration-300">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-[#185FA5] dark:border-t-blue-400"></div>
        <p className="mt-4 text-sm font-medium text-gray-400 dark:text-gray-500 tracking-tight">Loading listed records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 p-4 sm:p-8 font-sans antialiased text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Header Area */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 mb-6 gap-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight sm:text-3xl">Products</h1>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 mt-0.5 font-medium">
            Manage, discover, and monitor listed inventory records in real-time.
          </p>
        </div>
        {token && (
          <Link
            to="/add-product"
            className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-[#185FA5] dark:bg-blue-600 hover:bg-[#144F8A] dark:hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-[0_4px_12px_rgba(24,95,165,0.15)] hover:shadow-[0_4px_16px_rgba(24,95,165,0.25)] transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Create New Product
          </Link>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="max-w-6xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-100 dark:border-gray-700/80 rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-8 sticky top-20 z-30 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          
          {/* Search Input */}
          <div className="relative w-full lg:flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 dark:text-gray-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search products by title or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#185FA5]/5 dark:focus:ring-blue-500/10 focus:border-[#185FA5] dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400/80 dark:placeholder-gray-500 transition-all duration-200"
            />
          </div>

          {/* Controls Group */}
          <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-3">
            
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-56" ref={categoryDropdownRef}>
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700 px-4 py-2.5 rounded-xl flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800/60 shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#185FA5]/5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {getCategoryIcon(category)}
                  </span>
                  <span className="truncate">{category || "All Categories"}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400/80 dark:text-gray-500 transition-transform duration-200 flex-shrink-0 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] max-h-60 overflow-y-auto py-1.5 animate-in fade-in slide-in-from-top-1 duration-100">
                  <button
                    type="button"
                    onClick={() => { setCategory(""); setIsCategoryOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${category === "" ? "bg-blue-50/50 dark:bg-blue-900/30 text-[#185FA5] dark:text-blue-400 font-bold" : "text-gray-600 dark:text-gray-300 font-medium"}`}
                  >
                    <Layers className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    All Categories
                  </button>
                  <div className="my-1 border-t border-gray-100 dark:border-gray-700"></div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setCategory(cat); setIsCategoryOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${category === cat ? "bg-blue-50/50 dark:bg-blue-900/30 text-[#185FA5] dark:text-blue-400 font-bold" : "text-gray-600 dark:text-gray-300 font-medium"}`}
                    >
                      <span className={category === cat ? "text-[#185FA5] dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}>
                        {getCategoryIcon(cat)}
                      </span>
                      <span className="truncate">{cat}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48" ref={sortDropdownRef}>
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700 px-4 py-2.5 rounded-xl flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800/60 shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#185FA5]/5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ArrowUpDown className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  <span className="truncate">{getSortLabel(sort)}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400/80 dark:text-gray-500 transition-transform duration-200 flex-shrink-0 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 left-0 z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-1.5 animate-in fade-in slide-in-from-top-1 duration-100">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => { setSort(option.value); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${sort === option.value ? "bg-blue-50/50 dark:bg-blue-900/30 text-[#185FA5] dark:text-blue-400 font-bold" : "text-gray-600 dark:text-gray-300 font-medium"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {product.map((prod) => (
          <Link to={`/products/${prod._id}`} key={prod._id} className="block group">
            <div className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
              
              <div className="relative overflow-hidden w-full h-64 bg-gray-50/50 dark:bg-gray-900/50">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/60 text-gray-500 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-600">
                    {getCategoryIcon(prod.category)}
                    {prod.category}
                  </span>
                </div>

                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-[#185FA5] dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-1 tracking-tight">
                  {prod.name}
                </h2>

                <p className="text-gray-400 dark:text-gray-400 text-xs leading-relaxed mb-5 line-clamp-2">
                  {prod.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-gray-50 dark:border-gray-700/50">
                  <span className="text-xs font-bold text-[#185FA5] dark:text-blue-400 group-hover:text-[#144F8A] dark:group-hover:text-blue-300 transition-colors tracking-tight">
                    View Details
                  </span>
                  <span className="text-lg font-black text-gray-950 dark:text-white">
                    ₹{prod.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {product.length === 0 && (
        <div className="max-w-md mx-auto mt-16 p-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center mx-auto mb-3.5">
            <Folder className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-tight">No Inventory Records Found</h3>
          <p className="text-xs text-gray-400 dark:text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">Try broadening your active filters or tweaking your current keywords.</p>
        </div>
      )}
    </div>
  );
}

export default Products;