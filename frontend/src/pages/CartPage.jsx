import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("http://localhost:8080/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCart(data.items || []);
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

      // Refresh cart
      fetchCart();

      // Update navbar count
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/cart/${productId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Quantity updated");

      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My Cart</h1>

      {cart.map((item) => (
        <div key={item.product._id}>
          <h2>{item.product.name}</h2>

          <p>₹{item.product.price}</p>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() =>
                updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
              }
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(
                  item.product._id,
                  Math.min(item.product.stock, item.quantity + 1),
                )
              }
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.product._id)}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
