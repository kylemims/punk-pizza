import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { PizzaBuilder } from "./features/PizzaBuilder";
import { OrderList } from "./components/OrderList";
import { Layout } from "./Layout";
import { Checkout } from "./features/Checkout";
import { CartProvider } from "./context/CartProvider";
import { ReportsDashboard } from "./features/ReportsDashboard";
import { InventoryDashboard } from "./features/InventoryDashboard";
import { AboutPage } from "./components/AboutPage";
import { LoadingSpinner } from "./components/LoadingSpinner.jsx";
import { Suspense } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="pizza-builder" element={<PizzaBuilder />} />
              <Route path="order-list" element={<OrderList />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="reports" element={<ReportsDashboard />} />
              <Route path="inventory" element={<InventoryDashboard />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
