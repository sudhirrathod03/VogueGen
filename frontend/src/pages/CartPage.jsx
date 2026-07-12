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

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 99;
  const totalAmount = subtotal + shipping;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[65vh] gap-4 bg-slate-50/50">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-slate-500 tracking-wide">Securing your items...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/60 min-h-screen pb-28 lg:pb-20 pt-10 px-4 sm:px-6 lg:px-8 text-slate-900 antialiased selection:bg-blue-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title Section */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Cart</h1>
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
              {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          <p className="text-sm text-slate-500">Review your selection and delivery details below.</p>
        </div>

        {cart.length === 0 ? (
          /* Premium Empty State */
          <div className="text-center bg-white rounded-3xl border border-slate-100 p-12 sm:p-24 max-w-md mx-auto shadow-sm backdrop-blur-sm">
            <div className="mx-auto h-16 w-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 text-sm leading-relaxed max-w-xs mx-auto">Fill it with the best products from our curated catalog selection.</p>
            <Link
              to="/shop"
              className="inline-flex justify-center items-center w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-medium py-3 px-6 rounded-xl transition duration-150 shadow-sm"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          /* Dynamic Grid Split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Cart items split dynamically */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center justify-between transition duration-200 hover:border-slate-200/80 hover:shadow-sm"
                >
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    {/* Item Image */}
                    <img
                      src={item.product.image || "https://placehold.co/100"}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-slate-50 flex-shrink-0 border border-slate-100 mix-blend-multiply"
                    />
                    
                    {/* Details Structure */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <h2 className="text-sm sm:text-base font-semibold text-slate-900 truncate tracking-tight">
                        {item.product.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-slate-400">
                        ₹{item.product.price.toLocaleString("en-IN")} each
                      </p>
                      
                      {item.product.stock <= 5 && (
                        <div className="pt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-100">
                            Low stock: {item.product.stock} left
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Operational Settings Group */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 sm:gap-6 min-w-[120px] sm:min-w-0">
                    
                    {/* Compact Custom Stepper */}
                    <div className="flex items-center border border-slate-200 bg-slate-50/50 rounded-xl overflow-hidden shadow-inner p-0.5 h-8">
                      <button
                        onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="w-7 h-full flex items-center justify-center rounded-lg hover:bg-white active:bg-slate-100 text-slate-500 transition disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        −
                      </button>
                      <span className="px-2 font-medium text-slate-800 min-w-[1.75rem] text-center text-xs tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, Math.min(item.product.stock, item.quantity + 1))}
                        disabled={item.quantity >= item.product.stock}
                        className="w-7 h-full flex items-center justify-center rounded-lg hover:bg-white active:bg-slate-100 text-slate-500 transition disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        +
                      </button>
                    </div>

                    {/* Total & Clear Controls */}
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
                      <div className="text-right">
                        <p className="text-sm sm:text-base font-semibold text-slate-900 tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-slate-400 hover:text-slate-600 p-1.5 transition rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100"
                        title="Remove item"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Desktop Billing Details Container */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl border border-slate-100 p-6 lg:sticky lg:top-8 hidden lg:block shadow-sm">
              <h2 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-6">Summary Details</h2>
              
              <div className="space-y-4 text-sm pb-5 border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span className="font-medium text-slate-900 tabular-nums">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-slate-900 tabular-nums">
                    {shipping === 0 ? <span className="text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-xs">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-5 mb-6">
                <span className="text-sm font-medium text-slate-600">Total payable</span>
                <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>

              {shipping > 0 && (
                <div className="mb-6 bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                  <p className="text-xs text-slate-500">
                    Add <span className="font-semibold text-slate-800">₹{1000 - subtotal}</span> more to unlock <span className="font-semibold text-emerald-600">Free Delivery</span>
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3.5 px-4 rounded-xl transition duration-150 shadow-sm shadow-blue-600/10 flex items-center justify-center gap-2 text-sm"
              >
                Proceed to Checkout
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <div className="mt-5 text-center">
                <Link to="/products" className="text-xs font-medium text-slate-400 hover:text-slate-600 transition">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Responsive Floating Bottom Bar for Mobile Viewports */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/60 px-5 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] lg:hidden z-40 flex items-center justify-between gap-6">
          <div className="space-y-0.5">
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">Total Payable</span>
            <span className="text-xl font-bold text-slate-900 tracking-tight tabular-nums">₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="flex-1 max-w-[200px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-4 rounded-xl transition duration-150 text-sm shadow-sm flex items-center justify-center gap-2"
          >
            Checkout
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;