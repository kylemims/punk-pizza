import { useEffect, useState } from "react";
import { getSizes, getSauces, getCheeses, getToppings } from "../services/ingredientService";
import { getAllOrders } from "../services/orderService";
import dayjs from "dayjs";

export const InventoryDashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([getSizes(), getSauces(), getCheeses(), getToppings()]).then(
      ([sizes, sauces, cheeses, toppings]) => {
        const all = [...sizes, ...sauces, ...cheeses, ...toppings].map((item) => ({
          ...item,
          usageCount: 0,
          onHand: item.onHand || 100, // default stock
          parLevel: item.parLevel || 100, // default par
          type: determineType(item.id, sizes, sauces, cheeses, toppings),
        }));
        setIngredients(all);
      }
    );

    getAllOrders().then(setOrders);
  }, []);

  useEffect(() => {
    if (orders.length === 0 || ingredients.length === 0) return;

    const usageMap = {};
    orders.forEach((order) => {
      order.cart.forEach((pizza) => {
        [pizza.size, pizza.sauce, pizza.cheese, ...(pizza.toppings || [])].forEach((id) => {
          usageMap[id] = (usageMap[id] || 0) + 1;
        });
      });
    });

    const updated = ingredients.map((item) => ({
      ...item,
      usageCount: usageMap[item.id] || 0,
    }));

    setIngredients(updated);
  }, [orders]);

  const handleStockChange = (id, value) => {
    const updated = ingredients.map((item) =>
      item.id === id ? { ...item, onHand: parseInt(value, 10) || 0 } : item
    );
    setIngredients(updated);
  };

  const getStatus = (item) => {
    const diff = item.parLevel - item.onHand;
    if (diff >= 10) return "text-red-600 font-semibold";
    if (diff > 0) return "text-yellow-500 font-semibold";
    return "text-green-600 font-medium";
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-luckiest mb-6 text-center">Inventory Overview 🧾</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300 bg-white">
          <thead className="bg-redriot text-white">
            <tr>
              <th className="p-2 text-sm/4">#</th>
              <th className="p-2 text-md/4">Ingredient</th>
              <th className="p-2 text-md/4">Type</th>
              <th className="p-2 text-md/4">Usage</th>
              <th className="p-2 text-md/4">Cost</th>
              <th className="p-2 text-md/4">On-Hand</th>
              <th className="p-2 text-md/4">Par Level</th>
              <th className="p-2 text-md/4">Status</th>
              <th className="p-2 text-md/4">Suggested Order</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((item, index) => {
              const suggestedOrder = item.onHand < item.parLevel ? item.parLevel - item.onHand : 0;
              return (
                <tr key={item.id} className="border-t border-gray-300">
                  <td className="p-2 text-sm/4">{index + 1}</td>
                  <td className="p-2 font-semibold">{item.label}</td>
                  <td className="p-2 text-sm/4">{item.type}</td>
                  <td className="p-2 text-sm/4">{item.usageCount}</td>
                  <td className="p-2 text-sm/4">${item.price?.toFixed(2) || "0.00"}</td>
                  <td className="p-2 text-sm/4">
                    <input
                      type="number"
                      value={item.onHand}
                      onChange={(e) => handleStockChange(item.id, e.target.value)}
                      className="w-20 border rounded px-1 text-black"
                    />
                  </td>
                  <td className="p-2">{item.parLevel}</td>
                  <td className={`p-2 ${getStatus(item)}`}>
                    {item.onHand < item.parLevel
                      ? item.parLevel - item.onHand >= 10
                        ? "Low"
                        : "Near"
                      : "OK"}
                  </td>
                  <td className="p-2">{suggestedOrder}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const determineType = (id, sizes, sauces, cheeses, toppings) => {
  if (sizes.find((i) => i.id === id)) return "size";
  if (sauces.find((i) => i.id === id)) return "sauce";
  if (cheeses.find((i) => i.id === id)) return "cheese";
  if (toppings.find((i) => i.id === id)) return "topping";
  return "unknown";
};
