// import { updateInventoryFromOrder } from "./updateInventoryFromOrder";
import { deductInventory } from "../utils/inventoryUtils.js";
import { updateIngredient } from "./ingredientService";

//? fetch all order data from db.json
export const getAllOrders = () => {
  return fetch("http://localhost:3000/orders").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  });
};

//? POST orders to db.json
export const saveOrder = async (orderData, currentIngredients) => {
  try {
    // Step 1: Deduct inventory based on this order's cart
    const updatedIngredients = deductInventory(currentIngredients, orderData.cart);

    // Step 2: Save updated inventory to the DB
    const updatePromises = updatedIngredients.map((ingredient) => updateIngredient(ingredient));
    await Promise.all(updatePromises);

    // Step 3: Save the order itself
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to save order");
    }

    return await response.json();
  } catch (err) {
    console.error("Error saving order and updating inventory:", err);
    throw err;
  }
};
//? DELETE orders from db.json

export const deleteOrder = (orderId) => {
  return fetch(`http://localhost:3000/orders/${orderId}`, {
    method: "DELETE",
  });
};

//TODO: Uncomment if you need to update orders
// export const updateOrder = async (id, updatedData) => {
//   const res = await fetch(`http://localhost:8088/orders/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedData),
//   });

//   if (!res.ok) throw new Error("Failed to update order");
//   return res.json();
// };
