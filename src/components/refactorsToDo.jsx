// Refactor and clean up PizzaBuilder.jsx
//*---------------------------------------

//? TODO: button styling and behavior
// export const SelectionButton = ({
//   isSelected,
//   onClick,
//   children,
//   className = "px-4 py-2"
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`${className} rounded-xl ${
//         isSelected ? "bg-redriot text-white" : "bg-white text-black border"
//       }`}>
//       {children}
//     </button>
//   );
// };

//*----------------------------------------

//? TODO: TabContent Wrapper

// export const TabContent = ({ title, children, containerClass = "flex gap-4 mb-6" }) => {
//   return (
//     <>
//       <h3 className="text-2xl font-luckiest mb-2">{title}</h3>
//       <div className={containerClass}>
//         {children}
//       </div>
//     </>
//   );
// };

//*----------------------------------------

//? TODO: single selection option

// import { SelectionButton } from './SelectionButton';
// import { TabContent } from './TabContent';

// export const OptionSelector = ({
//   title,
//   options,
//   selectedValue,
//   onSelect,
//   containerClass,
//   buttonClass
// }) => {
//   return (
//     <TabContent title={title} containerClass={containerClass}>
//       {options.map(({ id, label }) => (
//         <SelectionButton
//           key={id}
//           isSelected={selectedValue === id}
//           onClick={() => onSelect(id)}
//           className={buttonClass}>
//           {label.toUpperCase()}
//         </SelectionButton>
//       ))}
//     </TabContent>
//   );
// };

//*----------------------------------------

//? TODO: multiple secletions

// import { SelectionButton } from './SelectionButton';
// import { TabContent } from './TabContent';

// export const MultiSelector = ({
//   title,
//   options,
//   selectedValues,
//   onToggle,
//   containerClass = "flex flex-wrap gap-4"
// }) => {
//   return (
//     <TabContent title={title} containerClass={containerClass}>
//       {options.map(({ id, label }) => (
//         <SelectionButton
//           key={id}
//           isSelected={selectedValues.includes(id)}
//           onClick={() => onToggle(id)}>
//           {label.toUpperCase()}
//         </SelectionButton>
//       ))}
//     </TabContent>
//   );
// };

//*----------------------------------------

//? TODO: Refactored PizzaBuilder.jsx

// import { useState, useEffect } from "react";
// import { PizzaRenderer } from "./PizzaRenderer";
// import { useCart } from "../context/useCart";
// import { getSizes, getSauces, getCheeses, getToppings } from "../services/ingredientService";
// import { SelectionButton } from "../components/SelectionButton";
// import { OptionSelector } from "../components/OptionSelector";
// import { MultiSelector } from "../components/MultiSelector";
// import { TabContent } from "../components/TabContent";

// export const PizzaBuilder = () => {
//   // ...existing state and effects...

//   const tabs = ["size", "sauce", "cheese", "toppings", "review"];

//   return (
//     <section className="bg-crust text-black px-4 py-8 max-w-6xl mx-auto">
//       <h2 className="text-4xl font-luckiest text-center mb-6">Build Your Pie</h2>

//       {/* Pizza Visual */}
//       <div className="flex justify-center mb-8">
//         <PizzaRenderer sauce={sauce} cheese={cheese} toppings={toppings} />
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap justify-center gap-2 mb-8">
//         {tabs.map((tab) => (
//           <SelectionButton
//             key={tab}
//             isSelected={activeTab === tab}
//             onClick={() => setActiveTab(tab)}
//             className="px-4 py-2 font-luckiest">
//             {tab.toUpperCase()}
//           </SelectionButton>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div>
//         {activeTab === "size" && (
//           <OptionSelector
//             title="Choose Pizza Size"
//             options={sizes}
//             selectedValue={size}
//             onSelect={setSize}
//           />
//         )}

//         {activeTab === "sauce" && (
//           <OptionSelector
//             title="Choose Sauce"
//             options={sauces}
//             selectedValue={sauce}
//             onSelect={setSauce}
//             containerClass="flex flex-wrap gap-4 mb-6"
//           />
//         )}

//         {activeTab === "cheese" && (
//           <OptionSelector
//             title="Cheese Options"
//             options={cheeses}
//             selectedValue={cheese}
//             onSelect={setCheese}
//             containerClass="flex gap-4"
//             buttonClass="px-3 py-2"
//           />
//         )}

//         {activeTab === "toppings" && (
//           <MultiSelector
//             title="Toppings"
//             options={toppingsList}
//             selectedValues={toppings}
//             onToggle={handleToppingChange}
//           />
//         )}

//         {activeTab === "review" && (
//           <TabContent title="Review Your Pizza" containerClass="">
//             <div className="mb-4">
//               <p><strong>Size:</strong> {size || "None"}</p>
//               <p><strong>Sauce:</strong> {sauce || "None"}</p>
//               <p><strong>Cheese:</strong> {cheese || "None"}</p>
//               <p><strong>Toppings:</strong> {toppings.length > 0 ? toppings.join(", ") : "None"}</p>
//             </div>

//             <button
//               onClick={handleAddToCart}
//               className="bg-redriot text-white px-6 py-3 rounded-xl mt-6 font-luckiest hover:bg-limepunk hover:text-black transition">
//               Add Pizza to Order
//             </button>
//           </TabContent>
//         )}
//       </div>
//     </section>
//   );
// };
