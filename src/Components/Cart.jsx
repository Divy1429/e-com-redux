import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../Features/cartSlice";
import { useNavigate } from "react-router-dom";
import { RAZORPAY_CONFIG, USD_TO_INR_RATE } from "../config/razorpay.config";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    setLoading(true);

    // Load Razorpay script
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setLoading(false);
      return;
    }

    // Convert USD to INR for Razorpay (Razorpay works with INR)
    const amountInINR = total * USD_TO_INR_RATE;
    
    // Configure Razorpay options
    const options = {
      key: RAZORPAY_CONFIG.KEY_ID, // Your Razorpay Key ID
      amount: Math.round(amountInINR * 100), // Amount in paise (multiply by 100)
      currency: RAZORPAY_CONFIG.CURRENCY,
      name: RAZORPAY_CONFIG.STORE_NAME,
      description: `Purchase of ${items.length} item(s)`,
      image: RAZORPAY_CONFIG.STORE_LOGO,
      handler: function (response) {
        // Payment successful
        console.log("Payment Response:", response);
        
        // Show success message
        alert(`✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\nAmount: $${total.toFixed(2)} (₹${amountInINR.toFixed(2)})`);
        
        // Clear cart after successful payment
        dispatch(clearCart());
        
        // Navigate to home
        setTimeout(() => {
          navigate("/");
        }, 1000);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer Address",
        items: items.map(item => `${item.title} (${item.quantity}x)`).join(", "),
      },
      theme: {
        color: RAZORPAY_CONFIG.THEME_COLOR,
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
          alert("Payment cancelled");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Subtotal</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b align-middle">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-sm line-clamp-2">{item.title}</span>
                  </td>
                  <td className="py-3">${item.price.toFixed(2)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-3">
                    <button
                      className="text-red-600"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <button
              className="text-sm text-red-500 hover:text-red-600 font-semibold"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
            <div className="text-right">
              <p className="text-gray-600 text-sm mb-1">Total Amount:</p>
              <div className="text-3xl font-bold text-green-600">
                ${total.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ₹{(total * USD_TO_INR_RATE).toFixed(2)} INR (approx)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  💳 Proceed to Payment
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
