import { useCart } from "../context/useCart";
import { calculatePizzaPrice } from "../utils/calculatePizzaPrice";
// import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const OrderSummary = () => {
  const { cart, tip, orderType, note } = useCart();
  const { ingredients } = useOutletContext();
  const navigate = useNavigate();
  const { setEditPizza, setEditIndex } = useCart();

  if (!Array.isArray(ingredients) || ingredients.length === 0 || !Array.isArray(cart)) {
    return <p className="p-6 text-center">Loading order summary...</p>;
  }

  const getLabel = (type, id) => {
    return ingredients.find((item) => item.type === type && item.id === id)?.label || id;
  };

  const subtotal = cart.reduce((total, pizza) => {
    try {
      return total + Number(calculatePizzaPrice(pizza, ingredients));
    } catch (err) {
      console.error("Price calculation failed:", err);
      return total;
    }
  }, 0);

  const total = subtotal + Number(tip || 0);
  return (
    <section className="w-[90vw] max-w-[700px] min-w-[280px] md:w-[700px] md:max-w-[700px] md:min-w-[700px] mx-auto p-6 bg-white shadow-md rounded-xl mt-8 text-black">
      <h2 className="text-3xl font-luckiest mb-4">Order Summary</h2>

      {cart.map((pizza, index) => (
        <div key={index} className="border-b border-gray-300 py-2">
          <p>
            <strong>Size:</strong> {getLabel("size", pizza.size)}
          </p>
          <p>
            <strong>Sauce:</strong> {pizza.sauce === "none" ? "None" : getLabel("sauce", pizza.sauce)}
          </p>
          <p>
            <strong>Cheese:</strong> {getLabel("cheese", pizza.cheese)}
          </p>
          <p>
            <strong>Toppings:</strong>{" "}
            {pizza.toppings.length > 0
              ? pizza.toppings.map((id) => getLabel("topping", id)).join(", ")
              : "None"}
          </p>
          <p>
            <strong>Price:</strong> ${Number(calculatePizzaPrice(pizza, ingredients)).toFixed(2)}
          </p>
          <button
            onClick={() => {
              setEditIndex(index);
              setEditPizza(pizza);
              navigate("/pizza-builder");
            }}
            className="text-limepunk underline font-bold text-md mt-1">
            Edit
          </button>
        </div>
      ))}

      <div className="mt-4 space-y-1">
        <p>
          <strong>Delivery or Takeout:</strong> {orderType}
        </p>
        <p>
          <strong>Special Note:</strong> {note || "—"}
        </p>
        <p>
          <strong>Tip:</strong> ${Number(tip).toFixed(2)}
        </p>
        <p className="text-lg font-bold border-t border-gray-300 pt-2">Total: ${total.toFixed(2)}</p>
      </div>
    </section>
  );
};
