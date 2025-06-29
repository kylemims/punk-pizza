import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-redriot text-white font-luckiest">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="text-2xl hover:text-limepunk transition">
          Jake N' Bakes
        </a>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="#" className="hover:text-limepunk">
            Order List
          </a>
          <a href="#" className="hover:text-limepunk">
            Reports
          </a>
          <a href="#" className="hover:text-limepunk">
            Employees
          </a>
          <a href="#" className="hover:text-limepunk">
            Create Order
          </a>
          <a href="#" className="hover:text-limepunk">
            Profile
          </a>
          <a href="#" className="hover:text-limepunk">
            Logout
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-lg">
          <a href="#" className="block hover:text-limepunk">
            Order List
          </a>
          <a href="#" className="block hover:text-limepunk">
            Reports
          </a>
          <a href="#" className="block hover:text-limepunk">
            Employees
          </a>
          <a href="#" className="block hover:text-limepunk">
            Create Order
          </a>
          <a href="#" className="block hover:text-limepunk">
            Profile
          </a>
          <a href="#" className="block hover:text-limepunk">
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};
