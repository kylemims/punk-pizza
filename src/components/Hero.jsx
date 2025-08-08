import { Link } from "react-router-dom";
import "./Home.css";

export const Hero = () => {
  return (
    <section className="bg-crust text-black flex flex-col items-center justify-center text-center px-4 min-h-[calc(90vh-4rem)] md:min-h-[calc(90vh-4rem)] py-8">
      <img
        src="/assets/dude-pizza.svg"
        alt="Jake the Zombie Pizza"
        className="pizza-guy-logo"
        loading="lazy"
      />
      <h1 className="text-4xl md:text-5xl font-luckiest mb-4">Welcome to Jake N' Bakes</h1>
      <Link
        to="/pizza-builder"
        className="bg-limepunk text-black px-8 py-4 rounded-xl text-xl font-luckiest hover:bg-lime-600 hover:text-white transition">
        Build Your Pie
      </Link>
    </section>
  );
};
