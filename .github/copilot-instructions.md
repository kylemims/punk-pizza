# Copilot Instructions for punk-pizza

Essential guidance for AI coding agents working in the Jake N' Bakes Pizza Builder project.

## 🏗️ Architecture Overview
- **React + Vite** with functional components, hooks, and Context API state management
- **Tailwind CSS** with custom punk-inspired colors: `redriot (#D72638)`, `limepunk (#AFFF00)`, `crust (#FFF1C1)`, `blackout (#121212)`
- **JSON Server** backend hosted on Render (`https://punk-pizza-api.onrender.com`)
- **Unified ingredients array** in `db.json` with `type` field for categorization (size, sauce, cheese, topping)

## 🔄 Data Flow Patterns
- **PizzaBuilder**: Local state + Context API for cart management. Price calculated via `calculatePizzaPrice(pizza, ingredients)`
- **Cart Context**: Stores cart items, tip, order type, notes. Tip is added to subtotal at display time, not in pizza calculations
- **Inventory Updates**: Orders automatically deduct ingredients via `deductInventory()` utility when saved
- **Real-time Pricing**: All prices are calculated from ingredients array, converted to numbers immediately on data load

## 🛠️ Critical Workflows
```bash
# Development (both needed)
npx json-server --watch db.json --port 8088  # Backend
npm run dev                                   # Frontend

# Data seeding (dev server must be OFF)
node seed.js
```

## 📝 Project-Specific Conventions
- **Responsive widths**: Use `w-[80vw] max-w-[700px] md:w-[700px] mx-auto` for consistent component sizing
- **Z-index hierarchy**: CartSidebar needs `z-[1100]`, BottomTabNav uses `z-1000`
- **Price display**: Always use `.toFixed(2)` to handle floating-point precision
- **Date handling**: Store as `toISOString()`, parse as local dates for filtering to avoid timezone bugs
- **Ingredient filtering**: Remove duplicates in UI components (e.g., multiple "No Cheese" options)

## 🧩 Key Integration Points
- **Context providers**: Cart state flows through `CartProvider` → `useCart()` hook
- **Price calculations**: `calculatePizzaPrice(pizza, ingredients)` in `src/utils/`
- **Ingredient service**: Central API calls in `src/services/ingredientService.js`
- **Visual pizza**: `PizzaRenderer` layers SVGs from `/assets/` based on selections
- **Order status**: Auto-updates from "Working on it" to "Completed" after 15 minutes

## 🎯 Component Patterns
- **TabContent extraction**: Repetitive tab UI can be extracted to reusable `<TabContent>` and `<SelectionButton>` components
- **Ingredient pickers**: Follow `IngredientPicker` pattern with unified `getLabel(type, id)` helper
- **Modal confirmations**: Use fixed positioning with backdrop blur for pizza addition confirmations

## 🔧 Testing & Debugging
- **Stripe test card**: `4242 4242 4242 4242` (any future exp/CVC)
- **Console logs**: Pizza rendering layers logged in `PizzaRenderer`
- **Price validation**: Check `calculatePizzaPrice` errors in cart calculations
- **Inventory tracking**: Verify ingredient `onHand` counts update after orders
