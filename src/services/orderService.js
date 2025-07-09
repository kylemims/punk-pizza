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

//? DELETE orders from db.json
export const deleteOrder = async (id) => {
  const res = await fetch(`http://localhost:8088/orders/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete order");
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
