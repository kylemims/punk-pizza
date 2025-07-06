import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartSidebar } from "./components/CartSidebar";
import { useState, useEffect } from "react";
import { getSizes, getSauces, getCheeses, getToppings } from "./services/ingredientService";

export const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [ingredients, setIngredients] = useState({
    sizes: [],
    sauces: [],
    cheeses: [],
    toppings: [],
  });

  useEffect(() => {
    Promise.all([getSizes(), getSauces(), getCheeses(), getToppings()]).then(
      ([sizes, sauces, cheeses, toppings]) => {
        setIngredients({ sizes, sauces, cheeses, toppings });
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setIsCartOpen={setIsCartOpen} />
      <main className="flex-grow">
        <Outlet context={{ setIsCartOpen, ingredients }} />
      </main>
      <Footer />
      <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} ingredients={ingredients} />
    </div>
  );
};
