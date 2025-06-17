const express = require("express");
const app = express();

const menu = [
  { id: 1, dish: "Baked Shrimp Scampi", price: 20 },
  { id: 2, dish: "Chicken Parmigiana", price: 14 },
  { id: 3, dish: "Margherita Pizza", price: 17 },
  { id: 4, dish: "Penne with Vodka Sauce", price: 18 }
];

app.use(express.json());

const requireChefRole = (req, res, next) => {
  const role = req.headers.role;
  if (role !== "chef") {
    return res.status(403).json({ error: "Only chefs can access this!" });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Welcome to Chef Marco's Italian Bistro!").end();
});

app.post("/reservations", (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) {
    return res.status(400).send("Missing name, date, or time");
  }
  res.status(201).send(`${name}, thank you for reserving at Chef Marco’s Restaurant on ${date} at ${time}! Your reservation is confirmed`);
});

app.get("/menu", (req, res) => {
  const { maxPrice } = req.query;
  if (!maxPrice) return res.json(menu);
  const filteredMenu = menu.filter(item => item.price <= parseFloat(maxPrice));
  if (filteredMenu.length === 0) {
    return res.status(404).json({ error: "No menu items found under that price." });
  }
  res.json(filteredMenu);
});

app.get("/menu/:menuItem", (req, res) => {
  const id = parseInt(req.params.menuItem);
  const item = menu.find(d => d.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Menu item not found");
  }
});

app.get("/chef/secret-recipe", requireChefRole, (req, res) => {
  res.json({ "Secret Sauce": "Butter, garlic, parmesan, love, and one drop of espresso." });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
