# 🍕 Jake N’ Bakes Pizza Builder

A bold, punk-inspired pizza-ordering web app where customers can create fully customized pies — while getting a glimpse behind the scenes. Designed to showcase both the **user** and **admin** experience in a single interface.

Built with React, Tailwind, and a JSON backend hosted on Render.

---

## 🚀 Features

### For Customers
- Build custom pizzas (size, sauce, cheese, toppings)
- Live cart sidebar with tip + special notes
- Stripe.js-powered checkout (test mode)
- Mobile-friendly design with sticky bottom navigation
- Post-checkout confirmation with options to build again or view order

### For Admins (No login required)
- View all submitted orders with real-time updates
- Auto-mark orders complete after 15 mins
- Filter and sort by date, price, or status
- Inventory dashboard that adjusts stock after every order
- Reports dashboard with KPIs and daily summaries


> **Note:** This app fuses both customer and admin views together — intentionally — so viewers can test everything in one smooth session.

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Context API
- **Backend:** JSON Server hosted on [Render](https://render.com)
- **Payments:** Stripe.js (test mode only)
- **Tooling:** ESLint, Faker.js, Prettier

---

## 🌐 Live Demo

- **Live App:** [pizza.kylemims.com](https://pizza.kylemims.com)
- **Code Repo:** [github.com/kylemims/punk-pizza](https://github.com/kylemims/punk-pizza)

---

## 💡 Developer Tips

No setup required — the app is fully functional with a hosted database.

> If you clone the repo and want to run it locally:

```bash
# Install dependencies
npm install

# (Optional) Start JSON server if modifying data locally
npx json-server --watch db.json --port 8088

# Start the dev server
npm run dev
```


## 🧪 Test Stripe Checkout


Stripe is in test mode and requires HTTPS for live use.

	•	Card Number: 4242 4242 4242 4242
	•	Exp: Any future date
	•	CVC: Any 3 digits


	⚠️ Note: If you modify and use a local db.json, run node seed.js first to generate mock orders.

⸻

👨‍🎨 Author

Made with grit and creativity by Kyle Mims
🧠 Nashville Software School · 2025