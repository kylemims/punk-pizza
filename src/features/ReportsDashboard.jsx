import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";
import dayjs from "dayjs";

export const ReportsDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ totalOrders: 0, totalSales: 0, averageOrderValue: 0 });
  const [dailyBreakdown, setDailyBreakdown] = useState([]);

  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  useEffect(() => {
    if (orders.length === 0) return;

    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => {
      const orderTotal =
        order.cart.reduce((acc, pizza) => acc + Number(pizza.price), 0) + Number(order.tip || 0);
      return sum + orderTotal;
    }, 0);
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    const breakdownMap = {};
    orders.forEach((order) => {
      const date = dayjs(order.created_at).format("MMM D, YYYY");
      const orderTotal =
        order.cart.reduce((acc, pizza) => acc + Number(pizza.price), 0) + Number(order.tip || 0);
      breakdownMap[date] = (breakdownMap[date] || 0) + orderTotal;
    });

    const breakdownArray = Object.entries(breakdownMap).map(([date, total]) => ({ date, total }));

    setSummary({ totalOrders, totalSales, averageOrderValue });
    setDailyBreakdown(breakdownArray);
  }, [orders]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-luckiest text-black mb-8 text-center">Sales Reports 💰</h2>

      {/* Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
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

      {/* Daily Breakdown Table */}
      <div className="bg-white text-black p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">Daily Breakdown</h3>
        <table className="w-full text-left">
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
      </div>
    </div>
  );
};

// import { useEffect, useState } from "react";
// import { getAllOrders } from "../services/orderService";
// import dayjs from "dayjs";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

// export const ReportsDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [totalSales, setTotalSales] = useState(0);
//   const [orderVolume, setOrderVolume] = useState(0);
//   const [averageOrderValue, setAverageOrderValue] = useState(0);
//   const [salesOverTime, setSalesOverTime] = useState([]);
//   const [topToppings, setTopToppings] = useState([]);
//   const [summary, setSummary] = useState([]);
//   const [dailyBreakdown, setDailyBreakdown] = useState([]);

//   useEffect(() => {
//     getAllOrders().then((data) => {
//       setOrders(data);
//       calculateMetrics(data);
//     });
//   }, []);

//   const calculateMetrics = (orders) => {
//     const total = orders.reduce((sum, order) => sum + parseFloat(order.cart?.[0]?.price || 0), 0);
//     const count = orders.length;
//     const aov = count > 0 ? total / count : 0;

//     const dateMap = {};
//     const toppingCount = {};

//     orders.forEach((order) => {
//       const date = new Date(order.created_at).toLocaleDateString();
//       dateMap[date] = (dateMap[date] || 0) + parseFloat(order.cart?.[0]?.price || 0);

//       order.cart?.[0]?.toppings?.forEach((topping) => {
//         toppingCount[topping] = (toppingCount[topping] || 0) + 1;
//       });
//     });

//     const dateArray = Object.entries(dateMap).map(([date, value]) => ({ date, value }));
//     const toppingArray = Object.entries(toppingCount).map(([name, value]) => ({ name, value }));

//     setTotalSales(total);
//     setOrderVolume(count);
//     setAverageOrderValue(aov);
//     setSalesOverTime(dateArray);
//     setTopToppings(toppingArray);
//   };

//   return (
//     <section className="max-w-6xl mx-auto px-4 py-10 text-black">
//       <h1 className="text-4xl font-luckiest mb-8 text-center">Reports Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         <MetricCard label="Total Sales" value={`$${totalSales.toFixed(2)}`} />
//         <MetricCard label="Orders Placed" value={orderVolume} />
//         <MetricCard label="Avg. Order Value" value={`$${averageOrderValue.toFixed(2)}`} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <ChartCard title="Sales Over Time">
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={salesOverTime}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="value" stroke="#FF6384" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Top Toppings">
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={topToppings} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
//                 {topToppings.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>
//     </section>
//   );
// };

// const MetricCard = ({ label, value }) => (
//   <div className="bg-white rounded-xl shadow-md p-6 text-center">
//     <h2 className="text-xl font-bold mb-2 font-luckiest">{label}</h2>
//     <p className="text-2xl">{value}</p>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-white rounded-xl shadow-md p-6">
//     <h3 className="text-xl font-luckiest mb-4">{title}</h3>
//     {children}
//   </div>
// );
