import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);
  

const fetchProducts = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/products",
      {
        params: {
          search,
          category,
          sort,
        },
      }
    );

    setProduct(res.data.data);

   
    if (categories.length === 0) {
      setCategories([
        ...new Set(
          res.data.data.map((item) => item.category)
        ),
      ]);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

  useEffect(() => {
  fetchProducts();
}, [search, category, sort]);




  return (
    <div className="min-h-screen bg-[#F7F9FC] p-8">
      
      {/* Top Header Row with Product Count & Action Button */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-6 mb-10 gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-[#185FA5]">
            Products
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Manage, discover, and monitor listed inventory records.
          </p>
        </div>

        {/* Top-Right "+ Add Product" Link Action Button */}
        <Link
          to="/add-product"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#185FA5] hover:bg-[#378ADD] text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-300 active:scale-95 whitespace-nowrap"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create New Product
        </Link>
      </div>




      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
  <input
    type="text"
    placeholder="Search Products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border border-gray-300 p-3 rounded-xl flex-1"
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="border border-gray-300 p-3 rounded-xl"
  >
    <option value="">
      All Categories
    </option>

    {categories.map((cat) => (
      <option
        key={cat}
        value={cat}
      >
        {cat}
      </option>
    ))}
  </select>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="border border-gray-300 p-3 rounded-xl"
  >
    <option value="">
      Sort By
    </option>

    <option value="price-asc">
      Price Low → High
    </option>

    <option value="price-desc">
      Price High → Low
    </option>

    <option value="rating">
      Highest Rated
    </option>
  </select>
</div>

      {/* Grid Layout Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.map((prod) => (
          <div
            key={prod._id}
            className="bg-[#E8EEF5] border border-[#D3D1C7] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative group"
          >
            <div className="relative overflow-hidden w-full h-64 bg-bg-card">
            <img
              src={prod.image}
              alt={prod.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <span className="inline-block bg-bg-card border border-border-color text-primary-nav text-[10px] font-extrabold uppercase  px-3 py-1 rounded-full text-sm  mb-3 w-fit">
                {prod.category}
              </span>

              {/* Playfair Serif Typography update */}
              <h2 className="text-xl font-bold font-serif text-[#2C2C2A] mb-2 group-hover:text-primary-nav transition-colors duration-200">
                {prod.name}
              </h2>

              <p className="text-[#5F5E5A] text-sm leading-relaxed mb-4 line-clamp-2">
                {prod.description}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200/40">
                <Link
                  to={`/products/${prod._id}`}
                  className="px-8 py-3 bg-[#185FA5] hover:bg-[#378ADD] text-white rounded-xl font-semibold transition"
                >
                  View Product
                </Link>

                <span className="text-2xl font-bold text-[#185FA5]">
                  ₹{prod.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
