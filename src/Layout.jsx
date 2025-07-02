import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartSidebar } from "./components/CartSidebar";
import { useState } from "react";

export const Layout = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Global order details for checkout
  const [orderType, setOrderType] = useState("delivery");
  const [tip, setTip] = useState(0);
  const [note, setNote] = useState("");

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
      />
    </div>
  );
};
