import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useState } from "react";
import { CartSidebar } from "./components/CartSidebar";

export const Layout = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setIsCartOpen={setIsCartOpen} />
      <main className="flex-grow">
        <Outlet context={{ cart, setCart, isCartOpen, setIsCartOpen }} />
      </main>
      <Footer />
      <CartSidebar cart={cart} setCart={setCart} isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </div>
  );
};
