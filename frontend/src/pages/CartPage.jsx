import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  fetchCart();
}, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Item removed from cart");
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
      toast.error("Could not remove item");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/cart/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Quantity updated");
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
      toast.error("Could not update quantity");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
          <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
            {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-sm p-12 border border-gray-100">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-xl font-medium text-gray-600 mb-4">Your cart is empty</p>
            <a
              href="/shop"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border border-gray-100 transition hover:shadow-md"
              >
                {/* Product Info Section */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.product.image || "https://placehold.co/100"}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100 flex-shrink-0 border border-gray-200"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                      Price per unit: ₹{item.product.price}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Available Stock: {item.product.stock}
                    </p>
                    {/* Mobile Only Total */}
                    <p className="text-base font-bold text-blue-600 mt-2 sm:hidden">
                      Total: ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Row Total */}
                <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {/* Plus/Minus Toggle */}
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 font-medium transition rounded-l-lg"
                    >
                      −
                    </button>
                    <span className="px-4 font-semibold text-gray-800 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          Math.min(item.product.stock, item.quantity + 1)
                        )
                      }
                      className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 font-medium transition rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Desktop Only Subtotal per row */}
                  <div className="text-right hidden sm:block min-w-[7rem]">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>

                  {/* Trash Action Button */}
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-gray-400 hover:text-red-600 p-2 transition rounded-lg hover:bg-red-50"
                    title="Remove Item"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
