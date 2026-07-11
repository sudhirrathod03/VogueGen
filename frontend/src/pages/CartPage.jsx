import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.get(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("authChanged"));
        navigate("/login");
        return;
      }

      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/cart/${productId}`, {
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
        `${BASE_URL}/api/cart/${productId}`,
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

  // Calculate Subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 99; // Free shipping over ₹1000
  const totalAmount = subtotal + shipping;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        <p className="text-sm font-medium text-gray-500">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-gray-500">
            {cart.reduce((acc, item) => acc + item.quantity, 0)} {cart.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="text-center bg-white rounded-2xl shadow-sm p-16 max-w-md mx-auto border border-gray-100">
            <div className="mx-auto h-20 w-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/shop"
              className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-sm shadow-blue-200"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          /* Grid Layout for items + summary */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex gap-4 items-center justify-between border border-gray-100 transition hover:shadow-md"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.product.image || "https://placehold.co/100"}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-50 flex-shrink-0 border border-gray-100"
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                        {item.product.name}
                      </h2>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </p>
                      {item.product.stock <= 5 && (
                        <p className="text-xs text-amber-600 font-medium mt-1">
                          Only {item.product.stock} left in stock!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop Controls & Actions */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3 sm:gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shadow-sm h-9">
                      <button
                        onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                        className="px-3 h-full hover:bg-gray-200 text-gray-600 font-medium transition"
                      >
                        −
                      </button>
                      <span className="px-3 font-bold text-gray-800 min-w-[1.5rem] text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, Math.min(item.product.stock, item.quantity + 1))}
                        className="px-3 h-full hover:bg-gray-200 text-gray-600 font-medium transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Pricing and Delete */}
                    <div className="flex items-center gap-4">
                      <div className="text-right min-w-[5.5rem]">
                        <p className="text-base sm:text-lg font-extrabold text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-gray-400 hover:text-red-500 p-2 transition rounded-xl hover:bg-red-50"
                        title="Remove Item"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Side Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Price ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-medium text-gray-800">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Charges</span>
                  <span className="font-medium text-gray-800">
                    {shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-4 mb-6">
                <span className="text-base font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-extrabold text-blue-600">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-400 text-center mb-4 bg-gray-50 py-1.5 rounded-lg">
                  Add <span className="font-semibold text-gray-600">₹{1000 - subtotal}</span> more for Free Delivery
                </p>
              )}

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition shadow-sm shadow-blue-200 flex items-center justify-center gap-2 text-base"
              >
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <div className="mt-4 text-center">
                <Link to="/products" className="text-sm font-medium text-blue-600 hover:underline">
                  Back to shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;