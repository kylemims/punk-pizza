import { useState } from "react";
import { PizzaRenderer } from "./PizzaRenderer";

export const PizzaBuilder = () => {
  const [activeTab, setActiveTab] = useState("size");

  // Pizza state
  const [size, setSize] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [toppings, setToppings] = useState([]);

  const handleToppingChange = (topping) => {
    setToppings((prev) =>
      prev.includes(topping) ? prev.filter((item) => item !== topping) : [...prev, topping]
    );
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
              {["small", "medium", "large"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSize(option)}
                  className={`px-4 py-2 rounded-xl ${
                    size === option ? "bg-redriot text-white" : "bg-white text-black border"
                  }`}>
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "sauce" && (
          <>
            <h3 className="text-2xl font-luckiest mb-2">Choose Sauce</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {["red-sauce", "bbq-sauce", "white-sauce"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSauce(option)}
                  className={`px-4 py-2 rounded-xl ${
                    sauce === option ? "bg-redriot text-white" : "bg-white text-black border"
                  }`}>
                  {option.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "cheese" && (
          <>
            <h3 className="text-2xl font-luckiest mb-2">Cheese Options</h3>
            <div className="flex gap-4">
              {["cheese", "extra-cheese", "none"].map((option) => (
                <button
                  key={option}
                  onClick={() => setCheese(option)}
                  className={`px-3 py-2 rounded-xl ${
                    cheese === option ? "bg-redriot text-white" : "bg-white text-black border"
                  }`}>
                  {option.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "toppings" && (
          <>
            <h3 className="text-2xl font-luckiest mb-2">Toppings</h3>
            <div className="flex flex-wrap gap-4">
              {[
                "pepperoni",
                "sausage",
                "bacon",
                "mushroom",
                "red-pepper",
                "green-pepper",
                "onion",
                "tomato",
                "olive",
                "pineapple",
                "spinach",
              ].map((topping) => (
                <button
                  key={topping}
                  onClick={() => handleToppingChange(topping)}
                  className={`px-4 py-2 rounded-xl ${
                    toppings.includes(topping)
                      ? "bg-redriot text-white"
                      : "bg-white text-black border"
                  }`}>
                  {topping.replace("-", " ").toUpperCase()}
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

            <button className="bg-redriot text-white px-6 py-3 rounded-xl mt-6 font-luckiest hover:bg-limepunk hover:text-black transition">
              Add Pizza to Order
            </button>
          </>
        )}
      </div>
    </section>
  );
};
