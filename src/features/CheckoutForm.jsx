import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "../context/useCart.jsx";
import { saveOrder } from "../services/orderService.js";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = ({ ingredients }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, tip, note, orderType, clearCart } = useCart();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const order = {
      cart,
      tip,
      note,
      orderType,
      created_at: new Date().toLocaleString(),
    };

    try {
      await saveOrder(order, ingredients);
      setMessage(
        "Payment successful! Enjoy your pie and don't be shy... leave a tip! And by tip, I mean your feedback would be greatly appreciated 😉"
      );
      clearCart();
      setTimeout(() => navigate("/"), 5000);
    } catch (error) {
      setMessage("❌ Payment succeeded but failed to save order.");
      console.error("Error saving order:", error);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "18px",
        color: "#000",
        "::placeholder": {
          color: "#888",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90vw] max-w-[700px] min-w-[280px] md:w-[700px] md:max-w-[700px] md:min-w-[700px] mx-auto bg-white text-black rounded-lg p-6 space-y-4">
      <h3 className="text-2xl font-luckiest">Payment Info</h3>
      <CardElement options={cardStyle} className="p-4 border border-black rounded-md" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-redriot text-white rounded-xl py-2 font-luckiest hover:bg-limepunk hover:text-black transition">
        Pay Now
      </button>
      {message && <div className="text-center mt-4">{message}</div>}
    </form>
  );
};
