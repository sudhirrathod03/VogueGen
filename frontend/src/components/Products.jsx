import axios from "axios";
import React, { useEffect, useState } from "react";

function Products() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-8">
      <h1 className="text-4xl font-bold text-[#185FA5] text-center mb-10">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.map((prod) => (
          <div
            key={prod._id}
            className="bg-[#E8EEF5] border border-[#D3D1C7] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <img
              src={prod.image}
              alt={prod.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5 flex flex-col flex-grow">
              <span className="inline-block bg-[#1D9E75]/10 text-[#1D9E75] px-3 py-1 rounded-full text-sm font-medium mb-3 w-fit">
                {prod.category}
              </span>

              <h2 className="text-xl font-bold text-[#2C2C2A] mb-2">
                {prod.name}
              </h2>

              <p className="text-[#5F5E5A] text-sm leading-relaxed mb-4">
                {prod.description}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4">
                <button className="px-5 cursor-pointer py-2 bg-[#185FA5] hover:bg-[#378ADD] text-white text-sm font-medium rounded-full transition-colors duration-300">
                  View Product
                </button>

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
