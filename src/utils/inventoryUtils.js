/**
 * Deducts ingredients from the inventory based on pizza orders.
 * @param {Array} ingredients - The current list of ingredients (with id, onHand, etc.)
 * @param {Array} cart - The list of pizzas in the current order
 * @returns {Array} - Updated list of ingredients
 */
export const deductInventory = (ingredients, cart) => {
  // Making a shallow copy to avoid direct mutation
  const updated = [...ingredients];

  cart.forEach((pizza) => {
    [pizza.size, pizza.sauce, pizza.cheese, ...(pizza.toppings || [])].forEach((id) => {
      const item = updated.find((ing) => ing.id === id);
      if (item) {
        item.onHand = Math.max(0, item.onHand - 1);
      }
    });
  });

  return updated;
};
