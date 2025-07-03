import { useState, useEffect } from "react";
import { PizzaRenderer } from "./PizzaRenderer";
import { useCart } from "../context/useCart";
import { getSizes, getSauces, getCheeses, getToppings } from "../services/ingredientService";

export const PizzaBuilder = () => {
  const [activeTab, setActiveTab] = useState("size");

  const [sizes, setSizes] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [toppingsList, setToppingsList] = useState([]);

  const [size, setSize] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [toppings, setToppings] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    getSizes().then(setSizes);
    getSauces().then(setSauces);
    getCheeses().then(setCheeses);
    getToppings().then(setToppingsList);
  }, []);

  const handleToppingChange = (toppingId) => {
    setToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((item) => item !== toppingId) : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    if (!size || !sauce || !cheese) return alert("Complete your pizza before adding!");

    addToCart({ size, sauce, cheese, toppings });
  };

  const tabs = ["size", "sauce", "cheese", "toppings", "review"];

  return (
    <section className="bg-crust text-black px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-4xl font-luckiest text-center mb-6">Build Your Pie</h2>

      {/* Pizza Visual */}
      <div className="flex justify-center mb-8">
        <PizzaRenderer sauce={sauce} cheese={cheese} toppings={toppings} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-luckiest ${
              activeTab === tab ? "bg-redriot text-white" : "bg-white text-black border"
            }`}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "size" && (
          <>
            <h3 className="text-2xl font-luckiest mb-2">Choose Pizza Size</h3>
            <div className="flex gap-4 mb-6">
              {sizes.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSize(id)}
                  className={`px-4 py-2 rounded-xl ${
                    size === id ? "bg-redriot text-white" : "bg-white text-black border"
                  }`}>
                  {label.toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "sauce" && (
          <>
            <h3 className="text-2xl font-luckiest mb-2">Choose Sauce</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {sauces.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSauce(id)}
                  className={`px-4 py-2 rounded-xl ${
                    sauce === id ? "bg-redriot text-white" : "bg-white text-black border"
                  }`}>
                  {label.toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "cheese" && (
          <>
            <h3 className="text-2xl font-luckiest mb-2">Cheese Options</h3>
            <div className="flex gap-4">
              {cheeses.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setCheese(id)}
                  className={`px-3 py-2 rounded-xl ${
                    cheese === id ? "bg-redriot text-white" : "bg-white text-black border"
                  }`}>
                  {label.toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "toppings" && (
          <>
            <h3 className="text-2xl font-luckiest mb-2">Toppings</h3>
            <div className="flex flex-wrap gap-4">
              {toppingsList.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleToppingChange(id)}
                  className={`px-4 py-2 rounded-xl ${
                    toppings.includes(id) ? "bg-redriot text-white" : "bg-white text-black border"
                  }`}>
                  {label.toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "review" && (
          <>
            <h3 className="text-2xl font-luckiest mb-4">Review Your Pizza</h3>
            <p>
              <strong>Size:</strong> {size || "None"}
            </p>
            <p>
              <strong>Sauce:</strong> {sauce || "None"}
            </p>
            <p>
              <strong>Cheese:</strong> {cheese || "None"}
            </p>
            <p>
              <strong>Toppings:</strong> {toppings.length > 0 ? toppings.join(", ") : "None"}
            </p>

            <button
              onClick={handleAddToCart}
              className="bg-redriot text-white px-6 py-3 rounded-xl mt-6 font-luckiest hover:bg-limepunk hover:text-black transition">
              Add Pizza to Order
            </button>
          </>
        )}
      </div>
    </section>
  );
};
