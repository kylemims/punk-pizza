import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";

const stripePromise = loadStripe(
  "pk_test_51RgOqjRnFeUuJfcyaJOOrL8NBWNrGSGBHbbnRjX4a1nNNtLjEtfoEzkqtgjVuYRcQ4wM9BS0RI2iHuzydfjcz7sX003oFuSfUB"
);

export const Checkout = () => {
  return (
    <section className="min-h-screen bg-crust text-black flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-luckiest mb-8">Checkout</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-5xl">
        <OrderSummary />
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </section>
  );
};

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { CheckoutForm } from "./CheckoutForm";
// import { OrderSummary } from "./OrderSummary";
// import { useOutletContext } from "react-router-dom";

// const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY_HERE");

// export const Checkout = () => {
//   const { cart, orderType, tip, note } = useOutletContext();

//   return (
//     <section className="min-h-screen bg-crust text-black flex flex-col items-center justify-center p-4 space-y-8">
//       <h2 className="text-4xl font-luckiest mb-6">Checkout</h2>

//       <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl">
//         <OrderSummary cart={cart} orderType={orderType} tip={tip} note={note} />

//         <Elements stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       </div>
//     </section>
//   );
// };
