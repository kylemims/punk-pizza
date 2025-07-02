import { useState } from "react";
import { Link } from "react-router-dom";

export const CartSidebar = ({ cart, setCart, isOpen, setIsOpen }) => {
  const [orderType, setOrderType] = useState("delivery");
  const [tip, setTip] = useState(0);
  const [note, setNote] = useState("");

  // Pricing
  const sizePrices = {
    small: 10,
    medium: 14,
    large: 18,
  };

  const getSubtotal = () => {
    return cart.reduce((total, pizza) => {
      const base = sizePrices[pizza.size] || 0;
      return total + base;
    }, 0);
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const subtotal = getSubtotal();
  const total = subtotal + Number(tip || 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-black text-white transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50 flex flex-col`}>
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
                <strong>Size:</strong> {pizza.size.toUpperCase()}
              </p>
              <p>
                <strong>Sauce:</strong> {pizza.sauce.replace("-", " ")}
              </p>
              <p>
                <strong>Cheese:</strong> {pizza.cheese.replace("-", " ")}
              </p>
              <p>
                <strong>Toppings:</strong>{" "}
                {pizza.toppings.length > 0 ? pizza.toppings.join(", ") : "None"}
              </p>
              <p>
                <strong>Price:</strong> ${sizePrices[pizza.size] || 0}
              </p>
              <button onClick={() => handleRemove(index)} className="text-redriot mt-2 underline">
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white space-y-4">
        {/* Delivery or Takeout */}
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

        {/* Tip */}
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

        {/* Special Note */}
        <div>
          <label className="block mb-1 font-luckiest">Special Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full text-black rounded px-2 py-1"
            rows="2"
            placeholder="Anything we should know?"></textarea>
        </div>

        {/* Totals */}
        <div className="border-t border-white pt-2">
          <p>
            <strong>Subtotal:</strong> ${subtotal}
          </p>
          <p>
            <strong>Total:</strong> ${total}
          </p>
        </div>

        {/* Checkout Button */}
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
