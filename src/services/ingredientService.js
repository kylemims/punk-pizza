const API = "http://localhost:3000";

const fetchIngredients = (type) => {
  return fetch(`${API}/${type}`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch " + type);
    return res.json();
  });
};

export const getSizes = () => fetchIngredients("sizes");
export const getSauces = () => fetchIngredients("sauces");
export const getCheeses = () => fetchIngredients("cheeses");
export const getToppings = () => fetchIngredients("toppings");
