const API = "http://localhost:3000";

// Unified fetch for all ingredients
export const getIngredients = () => {
  return fetch(`${API}/ingredients`).then((res) => res.json());
};

export const getSizes = () => {
  return getIngredients().then((all) => all.filter((item) => item.type === "size"));
};

export const getSauces = () => {
  return getIngredients().then((all) => all.filter((item) => item.type === "sauce"));
};

export const getCheeses = () => {
  return getIngredients().then((all) => all.filter((item) => item.type === "cheese"));
};

export const getToppings = () => {
  return getIngredients().then((all) => all.filter((item) => item.type === "topping"));
};

// PUT update for inventory adjustments
export const updateIngredient = (ingredient) => {
  return fetch(`${API}/ingredients/${ingredient.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredient),
  });
};
