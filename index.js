const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/cafe-finder")
  .then(() => {
    console.log("Connection with Mongo open");
  })
  .catch((err) => {
    console.log("There was an error with Mongo");
    console.log(err);
  });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Hello from CafeFinder");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
