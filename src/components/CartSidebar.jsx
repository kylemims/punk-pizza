import { useCart } from "../context/useCart";
import { calculatePizzaPrice } from "../utils/calculatePizzaPrice";
import { Link, useNavigate } from "react-router-dom";

export const CartSidebar = ({ isOpen, setIsOpen, ingredients }) => {
  const {
    cart,
    tip,
    orderType,
    note,
    setTip,
    setNote,
    setOrderType,
    removeFromCart,
    setEditPizza,
    setEditIndex,
  } = useCart();

  const navigate = useNavigate();

  // Safeguard: wait for ingredients to load
  if (!Array.isArray(ingredients) || ingredients.length === 0 || !Array.isArray(cart)) {
    return null;
  }

  // Unified helper for getting a label
  const getLabel = (type, id) => {
    return ingredients.find((item) => item.type === type && item.id === id)?.label || id;
  };

  const subtotal = cart.reduce((total, pizza) => {
    try {
      return total + Number(calculatePizzaPrice(pizza, ingredients));
    } catch (err) {
      console.error("Price calculation failed for pizza:", pizza, err);
      return total;
    }
  }, 0);

  const total = subtotal + Number(tip || 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-black text-white transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-[1100] flex flex-col`}>
      <div className="flex justify-between items-center p-4 border-b border-white">
        <h2 className="text-2xl font-luckiest">Your Cart</h2>
        <button onClick={() => setIsOpen(false)} className="text-2xl">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {cart.length === 0 ? (
          <p className="mt-4">Your cart is empty.</p>
        ) : (
          cart.map((pizza, index) => (
            <div key={index} className="border border-white rounded-lg p-2 mb-4">
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

              <div className="flex justify-between items-center mt-2">
                <button onClick={() => removeFromCart(index)} className="text-redriot underline text-sm">
                  Remove
                </button>
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setEditPizza(pizza);
                    setIsOpen(false);
                    navigate("/pizza-builder");
                  }}
                  className="text-limepunk underline text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white space-y-4">
        <div>
          <label className="block mb-1 font-luckiest">Delivery or Takeout</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full text-black rounded px-2 py-1">
            <option value="delivery">Delivery</option>
            <option value="takeout">Takeout</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-luckiest">Tip ($)</label>
          <input
            type="number"
            min="0"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="w-full text-black rounded px-2 py-1"
            placeholder="Enter tip amount"
          />
        </div>

        <div>
          <label className="block mb-1 font-luckiest">Special Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full text-black rounded px-2 py-1"
            rows="2"
            placeholder="Anything we should know?"
          />
        </div>

        <div className="border-t border-white pt-2">
          <p>
            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Tip:</strong> ${Number(tip).toFixed(2)}
          </p>
          <p>
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
        </div>

        <Link
          to="/checkout"
          onClick={() => setIsOpen(false)}
          className="block text-center bg-redriot text-white rounded-xl py-2 font-luckiest hover:bg-limepunk hover:text-black transition">
          Checkout
        </Link>
      </div>
    </div>
  );
};
