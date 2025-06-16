const menu = [
  { id: 1, dish: "Baked Shrimp Scampi", price: 20 },
  { id: 2, dish: "Chicken Parmigiana", price: 14 },
  { id: 3, dish: "Margherita Pizza", price: 17 },
  { id: 4, dish: "Penne with Vodka Sauce", price: 18 }
];


const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Welcome to Chef Marco's Italian Bistro!").end();
});

app.listen(8080, function () {
  console.log("Server is listening on port 8080");
});

app.get("/menu", (req, res) => {
  res.json(menu);
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
