export default function Hero() {
  return (
    <section className="bg-crust text-black flex flex-col items-center justify-center text-center px-4 py-12 md:py-24">
      <img
        src="/src/assets/jake-dude.svg"
        alt="Jake the Zombie Pizza"
        className="w-60 sm:w-72 md:w-96 mb-8"
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-luckiest mb-4">
        Welcome to Jake N' Bakes
      </h1>
      <p className="text-2xl sm:text-3xl mb-8 font-luckiest">Punk Rock Pizza</p>
      <a
        href="#"
        className="bg-redriot text-white px-8 py-4 rounded-xl text-xl font-luckiest hover:bg-limepunk hover:text-black transition">
        Build Your Pie
      </a>
    </section>
  );
}
