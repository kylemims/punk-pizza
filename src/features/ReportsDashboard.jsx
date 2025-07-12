import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";
import dayjs from "dayjs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const BAR_COLORS = [
  "#ff6347", // Sunday - tomato red
  "#ffa500", // Monday - orange
  "#ffcc00", // Tuesday - cheese yellow
  "#32cd32", // Wednesday - basil green
  "#40e0d0", // Thursday - teal
  "#1e90ff", // Friday - sauce blue
  "#9932cc", // Saturday - eggplant purple
];

export const ReportsDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [summary, setSummary] = useState({ totalOrders: 0, totalSales: 0, averageOrderValue: 0 });
  const [dailyBreakdown, setDailyBreakdown] = useState([]);
  const [topIngredients, setTopIngredients] = useState([]);
  const [salesByWeekday, setSalesByWeekday] = useState([]);

  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showDailyBreakdown, setShowDailyBreakdown] = useState(true);
  const [showTopIngredients, setShowTopIngredients] = useState(true);

  useEffect(() => {
    getAllOrders().then((data) => {
      setAllOrders(data);
      setFilteredOrders(data);
    });
  }, []);

  useEffect(() => {
    if (!selectedMonth) {
      setFilteredOrders(allOrders);
      return;
    }

    const filtered = allOrders.filter((order) => {
      const date = dayjs(order.created_at);
      return date.format("YYYY-MM") === selectedMonth;
    });

    setFilteredOrders(filtered);
  }, [selectedMonth, allOrders]);

  useEffect(() => {
    if (filteredOrders.length === 0) return;

    const totalOrders = filteredOrders.length;
    const totalSales = filteredOrders.reduce((sum, order) => {
      const orderTotal =
        order.cart.reduce((acc, pizza) => acc + Number(pizza.price), 0) + Number(order.tip || 0);
      return sum + orderTotal;
    }, 0);
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    const breakdownMap = {};
    const weekdayMap = {};
    const ingredientUsage = {};

    filteredOrders.forEach((order) => {
      const date = dayjs(order.created_at).format("MMM D, YYYY");
      const weekday = WEEKDAYS[new Date(order.created_at).getDay()];
      const orderTotal =
        order.cart.reduce((acc, pizza) => acc + Number(pizza.price), 0) + Number(order.tip || 0);
      breakdownMap[date] = (breakdownMap[date] || 0) + orderTotal;
      weekdayMap[weekday] = (weekdayMap[weekday] || 0) + orderTotal;

      order.cart.forEach((pizza) => {
        [pizza.size, pizza.sauce, pizza.cheese, ...(pizza.toppings || [])].forEach((id) => {
          ingredientUsage[id] = (ingredientUsage[id] || 0) + 1;
        });
      });
    });

    const breakdownArray = Object.entries(breakdownMap).map(([date, total]) => ({ date, total }));
    const weekdayArray = WEEKDAYS.map((day) => ({ day, total: weekdayMap[day] || 0 }));
    const topIngredientsArray = Object.entries(ingredientUsage)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    setSummary({ totalOrders, totalSales, averageOrderValue });
    setDailyBreakdown(breakdownArray);
    setSalesByWeekday(weekdayArray);
    setTopIngredients(topIngredientsArray);
  }, [filteredOrders]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-luckiest text-black mb-8 text-center">Sales Reports 💰</h2>

      {/* Filter by Month */}
      <div className="mb-6 text-center">
        <label className="block font-semibold mb-1 text-black">Filter by Month</label>
        <input
          type="month"
          className="border border-gray-400 p-2 rounded text-black"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {/* Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 sticky top-0 bg-crust z-10 p-4 rounded-xl shadow">
        <div className="bg-white text-black p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{summary.totalOrders}</p>
        </div>
        <div className="bg-white text-black p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-2xl font-bold">${summary.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white text-black p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">Avg. Order Value</p>
          <p className="text-2xl font-bold">${summary.averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Toggle Section: Daily Breakdown */}
      <div className="bg-white text-black p-4 rounded-xl shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Daily Breakdown</h3>
          <button
            onClick={() => setShowDailyBreakdown((prev) => !prev)}
            className="text-sm text-blue-600 underline">
            {showDailyBreakdown ? "Hide" : "Show"}
          </button>
        </div>
        {showDailyBreakdown && (
          <table className="w-full text-left transition-all duration-500 ease-in-out">
            <thead>
              <tr className="text-sm border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {dailyBreakdown.map(({ date, total }) => (
                <tr key={date} className="border-b">
                  <td className="py-2">{date}</td>
                  <td className="py-2">${total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Toggle Section: Top Ingredients */}
      <div className="bg-white text-black p-4 rounded-xl shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Top Ingredients Used</h3>
          <button
            onClick={() => setShowTopIngredients((prev) => !prev)}
            className="text-sm text-blue-600 underline">
            {showTopIngredients ? "Hide" : "Show"}
          </button>
        </div>
        {showTopIngredients && (
          <>
            <table className="w-full text-left transition-all duration-500 ease-in-out">
              <thead>
                <tr className="text-sm border-b">
                  <th className="py-2">Ingredient</th>
                  <th className="py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {(showAllIngredients ? topIngredients : topIngredients.slice(0, 5)).map(({ name, count }) => (
                  <tr key={name} className="border-b">
                    <td className="py-2">{name}</td>
                    <td className="py-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {topIngredients.length > 5 && (
              <div className="text-right mt-2">
                <button
                  onClick={() => setShowAllIngredients((prev) => !prev)}
                  className="text-sm text-blue-600 underline">
                  {showAllIngredients ? "Show Top 5" : "Show All"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Sales by Weekday Chart */}
      <div className="bg-white text-black p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">Sales by Day of the Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesByWeekday}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total">
              {salesByWeekday.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
