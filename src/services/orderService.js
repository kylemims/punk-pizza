// POST orders to db.json
export const saveOrder = (orderData) => {
  return fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to save order");
    }
    return response.json();
  });
};
