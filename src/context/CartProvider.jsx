import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("delivery");
  const [tip, setTip] = useState(0);
  const [note, setNote] = useState("");

  const addToCart = (pizza) => {
    setCart((prev) => [...prev, pizza]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        orderType,
        setOrderType,
        tip,
        setTip,
        note,
        setNote,
      }}>
      {children}
    </CartContext.Provider>
  );
};
