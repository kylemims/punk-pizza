// seed.js (ES Module format)
import { readFile, writeFile } from "fs/promises";
import { faker } from "@faker-js/faker";

// Read and parse the db.json file
const dbRaw = await readFile("db.json", "utf-8");
const db = JSON.parse(dbRaw);

// Helper to get random item
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generatePizza = () => {
  const sizes = ["small", "medium", "large"];
  const sauces = ["red-sauce", "bbq-sauce", "white-sauce"];
  const cheeses = ["cheese", "extra-cheese"];
  const toppings = [
    "pepperoni",
    "sausage",
    "bacon",
    "mushroom",
    "red-pepper",
    "green-pepper",
    "onion",
    "tomato",
    "olive",
    "pineapple",
    "spinach",
  ];

  const randomToppings = faker.helpers.arrayElements(toppings, faker.number.int({ min: 0, max: 5 }));

  return {
    size: getRandom(sizes),
    sauce: getRandom(sauces),
    cheese: getRandom(cheeses),
    toppings: randomToppings,
    price: faker.number.float({ min: 14, max: 28, precision: 0.01 }).toFixed(2),
  };
};

const generateOrder = () => ({
  id: faker.string.alphanumeric(5),
  cart: [generatePizza()],
  tip: faker.number.int({ min: 0, max: 10 }).toString(),
  note: faker.lorem.words(5),
  orderType: faker.helpers.arrayElement(["delivery", "takeout"]),
  created_at: new Date(faker.date.recent({ days: 30 })).toLocaleString(),
});

// Create 20 orders
const fakeOrders = Array.from({ length: 30 }, generateOrder);

// Overwrite or append to db
db.orders = fakeOrders;

// Write back to db.json with formatting
await writeFile("db.json", JSON.stringify(db, null, 2));

console.log("✅ Seeded 20 fake orders!");
