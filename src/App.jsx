import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

export const App = () => {
  return (
    <div className="min-h-screen bg-crust">
      <Navbar />
      <Hero />
    </div>
  );
};
