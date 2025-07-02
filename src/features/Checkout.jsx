import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";

const stripePromise = loadStripe("YOUR_STRIPE_TEST_PUBLIC_KEY");

export const Checkout = ({ cart, orderType, tip, note }) => {
  return (
    <section className="min-h-screen bg-crust text-black flex flex-col items-center justify-center p-4 space-y-8">
      <h2 className="text-4xl font-luckiest">Checkout</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <OrderSummary cart={cart} orderType={orderType} tip={tip} note={note} />

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </section>
  );
};
