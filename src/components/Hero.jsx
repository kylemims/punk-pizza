import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="bg-crust text-black flex flex-col items-center justify-center text-center px-4 py-12 md:py-24">
      <img src="/assets/dude-pizza.svg" alt="Jake the Zombie Pizza" className="w-64 md:w-96 mb-8" />
      <h1 className="text-4xl md:text-6xl font-luckiest mb-4">Welcome to Jake N' Bakes</h1>
      {/* <p className="text-2xl md:text-3xl mb-8 font-luckiest">Punk Rock Pizza</p> */}
      <Link
        to="/pizza-builder"
        className="bg-limepunk text-black px-8 py-4 rounded-xl text-xl font-luckiest hover:bg-lime-600 hover:text-white transition">
        Build Your Pie
      </Link>
    </section>
  );
};
