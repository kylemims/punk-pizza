import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;

  useEffect(() => {
    getAllOrders().then((data) => {
      // Sort by newest first by default
      const sorted = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setOrders(sorted);
    });
  }, []);

  const paginatedOrders = orders.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);

  const toggleExpand = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const getStatus = (createdAt) => {
    const createdTime = new Date(createdAt);
    const now = new Date();
    const minutesPassed = (now - createdTime) / (1000 * 60);
    return minutesPassed < 15 ? "Working on it" : "Completed";
  };

  return (
    <section className="max-w-4xl mx-auto py-8 px-4 text-black">
      <h2 className="text-4xl font-luckiest text-center mb-6">Order List</h2>

      {/* Filter + Sort Panel UI (functionality to be added later) */}
      <div className="flex justify-between items-center mb-6">
        <div className="mb-4 flex-col flex-wrap gap-4 justify-between items-center">
          <p className="text-gray-500 text-xs ml-1">Start Date</p>
          <input
            type="date"
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4 flex-col flex-wrap gap-4 justify-between items-center">
          <p className="text-gray-500 text-xs ml-1">End Date</p>
          <input
            type="date"
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mb-4 flex-col flex-wrap gap-4 justify-between items-center">
          <p className="text-gray-500 text-xs ml-1">Sort By</p>
          <select className="border rounded px-2 py-1">
            <option>Newest to Oldest</option>
            <option>Oldest to Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {paginatedOrders.map((order) => (
        <div
          key={order.id}
          className="border border-black rounded mb-4 p-4 bg-white shadow">
          <div className="flex justify-between items-center">
            <div>
              <p>
                <strong>ID:</strong> {order.id}
              </p>
              <p>
                <strong>Type:</strong> {order.orderType}
              </p>
              <p>
                <strong>Status:</strong> {getStatus(order.created_at)}
              </p>
              <p>
                <strong>Created:</strong> {order.created_at}
              </p>
            </div>
            <div className="text-right">
              <p>
                <strong>Total:</strong> ${order.cart.reduce((sum, item) => sum + Number(item.price), 0) + Number(order.tip || 0)}
              </p>
              <button
                onClick={() => toggleExpand(order.id)}
                className="text-sm font-bold underline text-limepunk">
                {expandedOrderId === order.id ? "Hide" : "View Details"}
              </button>
            </div>
          </div>

          {expandedOrderId === order.id && (
            <div className="mt-4">
              <p>
                <strong>Note:</strong> {order.note || "None"}
              </p>
              <ul className="mt-2 space-y-1">
                {order.cart.map((pizza, i) => (
                  <li
                    key={i}
                    className="border p-2 rounded">
                    🍕 <strong>{pizza.size}</strong> w/ {pizza.sauce}, {pizza.cheese}, Toppings: {pizza.toppings.join(", ")} (${pizza.price})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-redriot text-white px-4 py-2 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="text-black">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * ORDERS_PER_PAGE >= orders.length}
          className="bg-redriot text-white px-4 py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </section>
  );
};
