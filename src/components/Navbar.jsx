import { useState } from "react";
import CartIcon from "/assets/cart-icon.svg";

export const Navbar = ({ setIsCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-redriot text-white font-luckiest w-full">
      <div className="w-full px-4 flex items-center justify-between h-16">
        <a href="/" className="text-2xl/5 hover:text-limepunk transition">
          Jake N' Bakes
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg/4 items-center">
          <a href="/pizza-builder" className="hover:text-limepunk">
            Build Your Pie
          </a>
          <a href="/order-list" className="hover:text-limepunk">
            Orders
          </a>
          <a href="/reports" className="hover:text-limepunk">
            Reports
          </a>
          <a href="/inventory" className="hover:text-limepunk">
            Inventory
          </a>

          <button onClick={() => setIsCartOpen(true)} className="hover:text-limepunk flex items-center">
            <img src={CartIcon} alt="Cart" className="w-8 h-8 mr-1" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 text-lg/5">
          <a href="/pizza-builder" className="block hover:text-limepunk">
            Build Your Pie
          </a>
          <a href="/order-list" className="block hover:text-limepunk">
            Orders
          </a>
          <a href="/reports" className="block hover:text-limepunk">
            Reports
          </a>

          <a href="/inventory" className="block hover:text-limepunk">
            Inventory
          </a>

          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsOpen(false);
            }}
            className="flex items-end hover:text-limepunk">
            <span>Cart</span>
            <img src={CartIcon} alt="Cart" className="w-6 h-6 ml-1 mb-0.5" />
          </button>
        </div>
      )}
    </nav>
  );
};
