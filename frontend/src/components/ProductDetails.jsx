import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);

        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full w-fit">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-lg text-gray-600">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="text-yellow-500 font-semibold">
              ⭐ {product.rating}
            </span>

            <span className="text-green-600 font-medium">
              {product.stock} In Stock
            </span>
          </div>

          <h2 className="text-4xl font-bold text-[#185FA5]">
            ₹{product.price}
          </h2>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <div>
            <h3 className="font-semibold mb-2">Available Sizes</h3>

            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:border-blue-500"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="mt-6 w-fit px-8 py-3 bg-[#185FA5] hover:bg-[#378ADD] text-white rounded-xl font-semibold transition">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
