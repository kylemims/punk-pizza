import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { PizzaBuilder } from "./features/PizzaBuilder";
import { Layout } from "./Layout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="pizza-builder" element={<PizzaBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
