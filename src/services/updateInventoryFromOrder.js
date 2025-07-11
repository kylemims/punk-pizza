import { getIngredients, updateIngredient } from "./ingredientService";

// Accepts a new order and adjusts inventory based on ingredient usage
export const updateInventoryFromOrder = async (order) => {
  const allIngredients = await getIngredients();

  const usageMap = {};

  order.cart.forEach((pizza) => {
    [pizza.size, pizza.sauce, pizza.cheese, ...(pizza.toppings || [])].forEach((id) => {
      usageMap[id] = (usageMap[id] || 0) + 1;
    });
  });

  const updated = allIngredients.map((item) => {
    if (usageMap[item.id]) {
      return {
        ...item,
        onHand: Math.max((item.onHand || 0) - usageMap[item.id], 0),
      };
    }
    return item;
  });

  await Promise.all(updated.map(updateIngredient));
};
