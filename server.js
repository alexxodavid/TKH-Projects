const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Welcome to Chef Marco's Italian Bistro!").end();
});

app.listen(8080, function () {
  console.log("Server is listening on port 8080");
});
