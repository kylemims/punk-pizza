import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";
import { useOutletContext } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51RgOqjRnFeUuJfcyaJOOrL8NBWNrGSGBHbbnRjX4a1nNNtLjEtfoEzkqtgjVuYRcQ4wM9BS0RI2iHuzydfjcz7sX003oFuSfUB"
);

export const Checkout = () => {
  const { ingredients } = useOutletContext();

  return (
    <section className="min-h-screen bg-crust text-black flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-luckiest mb-8">Checkout</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-5xl">
        <OrderSummary />
        <Elements stripe={stripePromise}>
          <CheckoutForm ingredients={ingredients} />
        </Elements>
      </div>
    </section>
  );
};
