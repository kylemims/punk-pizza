export const calculatePizzaPrice = (pizza, ingredients) => {
  const findPrice = (id) => ingredients.find((i) => i.id === id)?.price || 0;

  const sizePrice = findPrice(pizza.size);
  const saucePrice = pizza.sauce === "none" ? 0 : findPrice(pizza.sauce);
  const cheesePrice = findPrice(pizza.cheese);
  const toppingPrices = (pizza.toppings || []).map(findPrice);

  const total = sizePrice + saucePrice + cheesePrice + toppingPrices.reduce((sum, p) => sum + p, 0);

  return total.toFixed(2);
};
