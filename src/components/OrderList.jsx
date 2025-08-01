import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";
import { deleteOrder } from "../services/orderService";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("dateDesc");
  const ORDERS_PER_PAGE = 10;

  useEffect(() => {
    getAllOrders().then((data) => {
      // Sort by newest first by default
      const sorted = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setOrders(sorted);
    });
  }, []);

  const filteredOrders = orders
    .filter((order) => {
      if (!startDate || !endDate) return true;

      const orderDate = new Date(order.created_at);
      const start = new Date(startDate);
      const end = new Date(endDate);

      //TODO: implement filtering for one day - if the start and end dates are the same
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      return orderDate >= start && orderDate <= end;
    })

    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      const priceA = parseFloat(a.cart?.[0]?.price || 0);
      const priceB = parseFloat(b.cart?.[0]?.price || 0);

      switch (sortBy) {
        case "dateAsc":
          return dateA - dateB;
        case "priceAsc":
          return priceA - priceB;
        case "priceDesc":
          return priceB - priceA;
        case "dateDesc":
        default:
          return dateB - dateA;
      }
    });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

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
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 rounded text-black">
            <option value="dateDesc">Date: Newest First</option>
            <option value="dateAsc">Date: Oldest First</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">
            {successMessage}
          </div>
        )}
      </div>

      {paginatedOrders.map((order) => (
        <div key={order.id} className="border border-black rounded mb-4 p-4 bg-white shadow">
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
              <button
                onClick={() => toggleExpand(order.id)}
                className="text-sm underline text-limepunk  hover:text-green-700">
                {expandedOrderId === order.id ? "Hide" : "View Details"}
              </button>
            </div>
            <div className="text-right">
              <p>
                <strong>Pizza:</strong> $
                {Number(order.cart.reduce((sum, item) => sum + Number(item.price), 0) || 0).toFixed(2)}
              </p>
              <p>
                <strong>Tip:</strong> ${Number(order.tip || 0).toFixed(2)}
              </p>
              <p className="border-t border-gray-300 my-1 pt-1">
                <strong>Total:</strong> $
                {Number(
                  order.cart.reduce((sum, item) => sum + Number(item.price), 0) + Number(order.tip || 0)
                ).toFixed(2)}
              </p>
              {/* <div className="flex sm:flex-col sm:items-center sm:justify-end"> */}

              {/* Delete button triggers modal */}
              <button
                onClick={() => {
                  setOrderToDelete(order.id);
                  setShowDeleteModal(true);
                }}
                className="text-sm text-red-500 underline hover:text-red-700 ml-4">
                Delete Order
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
                  <li key={i} className="border p-2 rounded">
                    🍕 <strong>{pizza.size}</strong> w/ {pizza.sauce}, {pizza.cheese}, Toppings:{" "}
                    {pizza.toppings.join(", ")} (${pizza.price})
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
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-sm space-y-4 text-center">
            <h2 className="text-xl font-luckiest">Confirm Deletion</h2>
            <p>Are you sure you want to delete this order?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={async () => {
                  await deleteOrder(orderToDelete);
                  setOrders((prev) => prev.filter((o) => o.id !== orderToDelete));
                  setShowDeleteModal(false);
                  setOrderToDelete(null);
                  setSuccessMessage("Order deleted successfully ✅");
                  setTimeout(() => setSuccessMessage(""), 3000);
                }}
                className="bg-redriot text-white px-4 py-2 rounded-xl hover:bg-limepunk hover:text-black">
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setOrderToDelete(null);
                }}
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-limepunk hover:text-black">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
