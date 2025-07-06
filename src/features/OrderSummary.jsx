import { useCart } from "../context/useCart";
import { calculatePizzaPrice } from "../utils/calculatePizzaPrice";
import { useEffect, useState } from "react";
import { getSizes, getSauces, getCheeses, getToppings } from "../services/ingredientService";

export const OrderSummary = () => {
  const { cart, orderType, tip, note } = useCart();
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    Promise.all([getSizes(), getSauces(), getCheeses(), getToppings()]).then(
      ([sizes, sauces, cheeses, toppings]) => {
        setIngredients({ sizes, sauces, cheeses, toppings });
      }
    );
  }, []);
  if (!ingredients) return null;

  const subtotal = cart.reduce((total, pizza) => {
    return total + Number(calculatePizzaPrice(pizza, ingredients));
  }, 0);

  const total = subtotal + Number(tip || 0);

  return (
    <div className="bg-white text-black rounded-lg p-4 w-full max-w-md space-y-4">
      <h3 className="text-2xl font-luckiest">Order Summary</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((pizza, index) => (
          <div key={index} className="border border-black rounded p-2">
            <p>
              <strong>Size:</strong> {pizza.size}
            </p>
            <p>
              <strong>Sauce:</strong> {pizza.sauce}
            </p>
            <p>
              <strong>Cheese:</strong> {pizza.cheese}
            </p>
            <p>
              <strong>Toppings:</strong> {pizza.toppings?.join(", ") || "None"}
            </p>
            <p>
              <strong>Price:</strong> {calculatePizzaPrice(pizza, ingredients)}
            </p>
          </div>
        ))
      )}

      <div className="border-t border-black pt-2">
        <p>
          <strong>Order Type:</strong> {orderType}
        </p>
        {note && (
          <p>
            <strong>Note:</strong> {note}
          </p>
        )}
        <p>
          <strong>Subtotal:</strong> ${Number(subtotal).toFixed(2)}
        </p>
        <p>
          <strong>Tip:</strong> ${Number(tip).toFixed(2)}
        </p>
        <p className="text-xl">
          <strong>Total:</strong> ${Number(total).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
