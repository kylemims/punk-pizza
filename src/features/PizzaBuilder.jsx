import { useState } from "react";

export const PizzaBuilder = () => {
  const [size, setSize] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [toppings, setToppings] = useState([]);

  const handleToppingChange = (topping) => {
    setToppings((prev) =>
      prev.includes(topping) ? prev.filter((item) => item !== topping) : [...prev, topping]
    );
  };

  const handleSubmit = () => {
    const pizza = {
      size,
      sauce,
      cheese,
      toppings,
    };
    console.log("Pizza built:", pizza);
    alert("Pizza added to order!");
  };

  return (
    <section className="bg-crust text-black px-4 py-8 max-w-3xl mx-auto">
      <h2 className="text-4xl font-luckiest text-center mb-6">Build Your Pie</h2>

      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="text-2xl font-luckiest mb-2">Size</h3>
        <div className="flex space-x-4">
          {["Small", "Medium", "Large"].map((option) => (
            <button
              key={option}
              onClick={() => setSize(option)}
              className={`px-4 py-2 rounded-xl font-luckiest ${
                size === option ? "bg-redriot text-white" : "bg-white text-black border"
              }`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Sauce Selection */}
      <div className="mb-6">
        <h3 className="text-2xl font-luckiest mb-2">Sauce</h3>
        <div className="flex space-x-4">
          {["Red", "White", "BBQ", "None"].map((option) => (
            <button
              key={option}
              onClick={() => setSauce(option)}
              className={`px-4 py-2 rounded-xl font-luckiest ${
                sauce === option ? "bg-redriot text-white" : "bg-white text-black border"
              }`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Cheese Selection */}
      <div className="mb-6">
        <h3 className="text-2xl font-luckiest mb-2">Cheese</h3>
        <div className="flex space-x-4">
          {["Normal", "Extra", "None"].map((option) => (
            <button
              key={option}
              onClick={() => setCheese(option)}
              className={`px-4 py-2 rounded-xl font-luckiest ${
                cheese === option ? "bg-redriot text-white" : "bg-white text-black border"
              }`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Toppings */}
      <div className="mb-6">
        <h3 className="text-2xl font-luckiest mb-2">Toppings</h3>
        <div className="flex flex-wrap gap-4">
          {[
            "Pepperoni",
            "Mushrooms",
            "Olives",
            "Pineapple",
            "Onions",
            "Peppers",
            "Bacon",
            "Sausage",
          ].map((topping) => (
            <button
              key={topping}
              onClick={() => handleToppingChange(topping)}
              className={`px-4 py-2 rounded-xl font-luckiest ${
                toppings.includes(topping) ? "bg-redriot text-white" : "bg-white text-black border"
              }`}>
              {topping}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-redriot text-white px-8 py-4 rounded-xl text-xl font-luckiest hover:bg-limepunk hover:text-black transition">
          Add Pizza to Order
        </button>
      </div>
    </section>
  );
};
