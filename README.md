# 🍕 Jake N' Bakes Pizza Builder

A sleek, full-featured pizza ordering app where customers can build their own pie, customize ingredients, review order summaries, and complete checkout — while admins can view and manage live order data.


---

## 🚀 Features



### 🧑‍🍳 Customer-Facing
- **Pizza Builder**: Select size, sauce, cheese, and toppings
- **Live Pricing**: Ingredient prices calculated instantly
- **Cart Sidebar**: View order summary, tip, special notes, and checkout flow
- **Confirmation Modal**: Choose to build another pizza or view cart
- **Stripe Integration**: Mock checkout experience
- **Mobile Friendly**: Responsive UI built with Tailwind CSS



### 🧑‍💼 Admin Tools
- **Order List View**: Displays paginated orders with status indicators
- **Smart Statuses**: "Working on it" auto-updates to "Completed" after 15 minutes
- **Filter Orders**: Date range filter with exact or multiple-day span
- **Sort Orders**: By price (low/high) and date (newest/oldest)
- **Order Details**: Click-to-expand or modal-based view (WIP)
- **Future Plans**:
  - Reports dashboard
  - Employee profile management
  - Onboarding forms
  - Auth + role-based access

---



## 🛠 Tech Stack

- **React** (Vite)
- **React Router**
- **Tailwind CSS**
- **Context API** (Cart management)
- **Stripe.js** (Test payment form)
- **JSON Server** (Fake backend)
- **Faker.js + fs** (Data seeding for testing)

---



## ⚙️ Getting Started


### 1. Clone + Install
```bash
git clone https://github.com/your-username/punk-pizza.git
cd punk-pizza
npm install
```

### 2. Start JSON Server
```bash
npx json-server --watch db.json --port 8088
```

### 3. Start React App
```bash
npm run dev
```


🧪 Test Stripe Checkout



Stripe is in test mode and requires HTTPS for live use.

	•	Card Number: 4242 4242 4242 4242
	•	Exp: Any future date
	•	CVC: Any 3 digits


🗃 Seed Test Orders

Run this once to populate your db.json with random orders:

```bash
node seed.js
```

⚠️ Make sure you run this while your dev server is off to avoid race conditions.


👥 Contributors

Built with love by Kyle Mims, as part of a full-stack software engineering bootcamp at Nashville Software School.
