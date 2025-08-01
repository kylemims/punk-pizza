import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("delivery");
  const [tip, setTip] = useState(0);
  const [note, setNote] = useState("");
  const [editPizza, setEditPizza] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const addToCart = (pizza) => {
    setCart((prev) => [...prev, pizza]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const updatePizzaAtIndex = (updatedPizza, index) => {
    const updatedCart = [...cart];
    updatedCart[index] = updatedPizza;
    setCart(updatedCart);
    setEditIndex(null);
    setEditPizza(null);
  };

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
        editIndex,
        setEditIndex,
        editPizza,
        setEditPizza,
        updatePizzaAtIndex,
      }}>
      {children}
    </CartContext.Provider>
  );
};
