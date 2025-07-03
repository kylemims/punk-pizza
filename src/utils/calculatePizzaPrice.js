
export const calculatePizzaPrice = (pizza, ingredients) => {
  const { size, sauce, cheese, toppings } = pizza;
  let total = 0;

  const findPrice = (list, id) => {
    const item = list.find((i) => i.id === id);
    return item ? item.price : 0;
  };

  if (size) total += findPrice(ingredients.sizes, size);
  if (sauce && sauce !== "no-sauce") total += findPrice(ingredients.sauces, sauce);
  if (cheese && cheese !== "none") total += findPrice(ingredients.cheeses, cheese);

  if (Array.isArray(toppings)) {
    toppings.forEach((topping) => {
      if (topping !== "no-toppings") {
        total += findPrice(ingredients.toppings, topping);
      }
    });
  }

  return total.toFixed(2);
};
