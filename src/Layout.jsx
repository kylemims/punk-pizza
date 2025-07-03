import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartSidebar } from "./components/CartSidebar";
import { getSizes, getSauces, getCheeses, getToppings } from "./services/ingredientService";

export const Layout = () => {
  // Cart and order-related state
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("delivery");
  const [tip, setTip] = useState(0);
  const [note, setNote] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Ingredient data state
  const [sizes, setSizes] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    getSizes().then(setSizes);
    getSauces().then(setSauces);
    getCheeses().then(setCheeses);
    getToppings().then(setToppings);
  }, []);

  const ingredientData = { sizes, sauces, cheeses, toppings };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setIsCartOpen={setIsCartOpen} />

      <main className="flex-grow">
        <Outlet
          context={{
            cart,
            setCart,
            orderType,
            setOrderType,
            tip,
            setTip,
            note,
            setNote,
            ingredientData,
          }}
        />
      </main>

      <Footer />

      <CartSidebar
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        orderType={orderType}
        setOrderType={setOrderType}
        tip={tip}
        setTip={setTip}
        note={note}
        setNote={setNote}
        ingredientData={ingredientData}
      />
    </div>
  );
};
