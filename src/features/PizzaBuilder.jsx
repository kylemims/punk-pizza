import { useState, useEffect } from "react";
import { PizzaRenderer } from "./PizzaRenderer";
import { useCart } from "../context/useCart";
import { getIngredients } from "../services/ingredientService";
import { calculatePizzaPrice } from "../utils/calculatePizzaPrice";
import { useOutletContext } from "react-router-dom";

export const PizzaBuilder = () => {
  const [activeTab, setActiveTab] = useState("size");
  const [size, setSize] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [cheese, setCheese] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { setIsCartOpen } = useOutletContext();
  // const [sizes, setSizes] = useState([]);
  // const [sauces, setSauces] = useState([]);
  // const [cheeses, setCheeses] = useState([]);
  // const [toppingsOptions, setToppingsOptions] = useState([]);

  const { editPizza, editIndex, updatePizzaAtIndex, setEditPizza, setEditIndex, addToCart } = useCart();

  useEffect(() => {
    getIngredients().then(setIngredients);
    // getSizes().then(setSizes);
    // getSauces().then(setSauces);
    // getCheeses().then(setCheeses);
    // getToppings().then(setToppingsOptions);
  }, []);

  // Load pizza if in edit mode
  useEffect(() => {
    if (editPizza) {
      setSize(editPizza.size);
      setSauce(editPizza.sauce);
      setCheese(editPizza.cheese);
      setToppings(editPizza.toppings);
    }
  }, [editPizza]);

  const handleToppingChange = (id) => {
    setToppings((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const handleAddToCart = () => {
    if (!size || !sauce || !cheese) {
      alert("Geez, did ya forget your size, sauce, or cheese!");
      return;
    }

    const price = calculatePizzaPrice({ size, sauce, cheese, toppings }, ingredients);

    const pizza = { size, sauce, cheese, toppings, price };

    if (editPizza !== null && editIndex !== null) {
      updatePizzaAtIndex(pizza, editIndex);
    } else {
      addToCart(pizza);
    }

    setShowModal(true);
  };

  const getLabel = (type, id) =>
    ingredients.find((item) => item.type === type && item.id === id)?.label || id;

  const sizes = ingredients.filter((i) => i.type === "size");
  const sauces = ingredients.filter((i) => i.type === "sauce");
  const cheeses = ingredients.filter((i) => i.type === "cheese");
  const toppingsList = ingredients.filter((i) => i.type === "topping");

  return (
    <section className="bg-crust text-black px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-4xl font-luckiest text-center mb-6">Build Your Pie</h2>

      <div className="flex justify-center mb-8">
        <PizzaRenderer sauce={sauce} cheese={cheese} toppings={toppings} />
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {["size", "sauce", "cheese", "toppings", "review"].map((tab) => (
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

      <div>
        {activeTab === "size" && (
          <IngredientPicker title="Choose Pizza Size" options={sizes} selected={size} onSelect={setSize} />
        )}
        {activeTab === "sauce" && (
          <IngredientPicker title="Choose Sauce" options={sauces} selected={sauce} onSelect={setSauce} />
        )}
        {activeTab === "cheese" && (
          <IngredientPicker title="Choose Cheese" options={cheeses} selected={cheese} onSelect={setCheese} />
        )}
        {activeTab === "toppings" && (
          <div>
            <h3 className="text-2xl font-luckiest mb-2">Choose Toppings</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setToppings([])}
                className="px-4 py-2 rounded-xl bg-white text-black border hover:bg-redriot hover:text-white">
                NO TOPPINGS
              </button>
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
          </div>
        )}

        {activeTab === "review" && (
          <div>
            <h3 className="text-2xl font-luckiest mb-4">Review Your Pizza</h3>
            <p>
              <strong>Size:</strong> {getLabel("size", size)}
            </p>
            <p>
              <strong>Sauce:</strong> {sauce === "none" ? "None" : getLabel("sauce", sauce)}
            </p>
            <p>
              <strong>Cheese:</strong> {getLabel("cheese", cheese)}
            </p>
            <p>
              <strong>Toppings:</strong>{" "}
              {toppings.length ? toppings.map((id) => getLabel("topping", id)).join(", ") : "None"}
            </p>

            <button
              onClick={handleAddToCart}
              className="bg-redriot text-white px-6 py-3 rounded-xl mt-6 font-luckiest hover:bg-limepunk hover:text-black transition">
              Add Pizza to Order
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md space-y-4 text-center">
            <h2 className="text-2xl font-luckiest mb-2">Pizza Added! 🍕</h2>
            <p className="text-lg">What would you like to do next?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setShowModal(false);
                }}
                className="bg-redriot text-white px-4 py-2 rounded-xl hover:bg-limepunk hover:text-black">
                Go to Cart
              </button>
              <button
                onClick={() => {
                  setSize(null);
                  setSauce(null);
                  setCheese(null);
                  setToppings([]);
                  setActiveTab("size");
                  setShowModal(false);
                }}
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-limepunk hover:text-black">
                Add Another
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const IngredientPicker = ({ title, options, selected, onSelect }) => (
  <div>
    <h3 className="text-2xl font-luckiest mb-2">{title}</h3>
    <div className="flex flex-wrap gap-4 mb-6">
      {options.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`px-4 py-2 rounded-xl ${
            selected === id ? "bg-redriot text-white" : "bg-white text-black border"
          }`}>
          {label.toUpperCase()}
        </button>
      ))}
    </div>
  </div>
);

// return (
//   <section className="bg-crust text-black px-4 py-8 max-w-6xl mx-auto">
//     <h2 className="text-4xl font-luckiest text-center mb-6">Build Your Pie</h2>

//     <div className="flex justify-center mb-8">
//       <PizzaRenderer sauce={sauce} cheese={cheese} toppings={toppings} />
//     </div>

//     <div className="flex flex-wrap justify-center gap-2 mb-8">
//       {["size", "sauce", "cheese", "toppings", "review"].map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`px-4 py-2 rounded-xl font-luckiest ${
//             activeTab === tab ? "bg-redriot text-white" : "bg-white text-black border"
//           }`}>
//           {tab.toUpperCase()}
//         </button>
//       ))}
//     </div>

//     {/* Tab Content */}
//     <div>
//       {activeTab === "size" && (
//         <div>
//           <h3 className="text-2xl font-luckiest mb-2">Choose Pizza Size</h3>
//           <div className="flex gap-4 mb-6 flex-wrap">
//             {sizes.map(({ id, label }) => (
//               <button
//                 key={id}
//                 onClick={() => setSize(id)}
//                 className={`px-4 py-2 rounded-xl ${
//                   size === id ? "bg-redriot text-white" : "bg-white text-black border"
//                 }`}>
//                 {label.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === "sauce" && (
//         <div>
//           <h3 className="text-2xl font-luckiest mb-2">Choose Sauce</h3>
//           <div className="flex flex-wrap gap-4 mb-6">
//             <button
//               onClick={() => setSauce("none")}
//               className={`px-4 py-2 rounded-xl ${
//                 sauce === "none" ? "bg-redriot text-white" : "bg-white text-black border"
//               }`}>
//               NO SAUCE
//             </button>
//             {sauces.map(({ id, label }) => (
//               <button
//                 key={id}
//                 onClick={() => setSauce(id)}
//                 className={`px-4 py-2 rounded-xl ${
//                   sauce === id ? "bg-redriot text-white" : "bg-white text-black border"
//                 }`}>
//                 {label.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === "cheese" && (
//         <div>
//           <h3 className="text-2xl font-luckiest mb-2">Choose Cheese</h3>
//           <div className="flex flex-wrap gap-4 mb-6">
//             {cheeses.map(({ id, label }) => (
//               <button
//                 key={id}
//                 onClick={() => setCheese(id)}
//                 className={`px-4 py-2 rounded-xl ${
//                   cheese === id ? "bg-redriot text-white" : "bg-white text-black border"
//                 }`}>
//                 {label.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === "toppings" && (
//         <div>
//           <h3 className="text-2xl font-luckiest mb-2">Choose Toppings</h3>
//           <div className="flex flex-wrap gap-4 mb-6">
//             <button
//               onClick={() => setToppings([])}
//               className="px-4 py-2 rounded-xl bg-white text-black border hover:bg-redriot hover:text-white">
//               NO TOPPINGS
//             </button>
//             {toppingsOptions.map(({ id, label }) => (
//               <button
//                 key={id}
//                 onClick={() => handleToppingChange(id)}
//                 className={`px-4 py-2 rounded-xl ${
//                   toppings.includes(id) ? "bg-redriot text-white" : "bg-white text-black border"
//                 }`}>
//                 {label.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === "review" && (
//         <div>
//           <h3 className="text-2xl font-luckiest mb-4">Review Your Pizza</h3>
//           <p>
//             <strong>Size:</strong> {getLabel(sizes, size)}
//           </p>
//           <p>
//             <strong>Sauce:</strong> {sauce === "none" ? "None" : getLabel(sauces, sauce)}
//           </p>
//           <p>
//             <strong>Cheese:</strong> {getLabel(cheeses, cheese)}
//           </p>
//           <p>
//             <strong>Toppings:</strong>{" "}
//             {toppings.length > 0 ? toppings.map((id) => getLabel(toppingsOptions, id)).join(", ") : "None"}
//           </p>

//           <button
//             onClick={handleAddToCart}
//             className="bg-redriot text-white px-6 py-3 rounded-xl mt-6 font-luckiest hover:bg-limepunk hover:text-black transition">
//             Add Pizza to Order
//           </button>
//         </div>
//       )}
//     </div>

//     {/* Modal */}
//     {showModal && (
//       <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//         <div className="bg-white text-black rounded-xl p-6 w-full max-w-md space-y-4 text-center">
//           <h2 className="text-2xl font-luckiest mb-2">Pizza Added! 🍕</h2>
//           <p className="text-lg">What would you like to do next?</p>
//           <div className="flex justify-center gap-4 mt-4">
//             <button
//               onClick={() => {
//                 setIsCartOpen(true);
//                 setShowModal(false);
//               }}
//               className="bg-redriot text-white px-4 py-2 rounded-xl hover:bg-limepunk hover:text-black">
//               Go to Cart
//             </button>
//             <button
//               onClick={() => {
//                 setSize(null);
//                 setSauce(null);
//                 setCheese(null);
//                 setToppings([]);
//                 setActiveTab("size");
//                 setShowModal(false);
//               }}
//               className="bg-black text-white px-4 py-2 rounded-xl hover:bg-limepunk hover:text-black">
//               Add Another
//             </button>
//           </div>
//         </div>
//       </div>
//     )}
//   </section>
// );
// };
