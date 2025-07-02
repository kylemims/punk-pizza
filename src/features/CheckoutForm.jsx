import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Payment Successful (Test Mode)");
      console.log("Payment Method:", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg p-6 space-y-4">
      <h3 className="text-2xl font-luckiest">Payment Info</h3>

      <CardElement className="p-4 border border-black rounded-md" />

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
