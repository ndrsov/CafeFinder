const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Coffeeshop = require("./models/coffeeshop");

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

app.get("/makeshop", async (req, res) => {
  const shop = new Coffeeshop({
    title: "The bean bag",
    description: "The hottest new coffe shop in town",
  });
  await shop.save();
  res.send(shop);
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
