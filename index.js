const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/coffeeshops", async (req, res) => {
  const cafes = await Coffeeshop.find({});
  res.render("coffeeshops/index", { cafes });
});

app.get("/coffeeshops/new", (req, res) => {
  res.render("coffeeshops/new");
});

app.post("/coffeeshops", async (req, res) => {
  const cafe = new Coffeeshop(req.body.cafe);
  await cafe.save();
  res.redirect(`/coffeeshops/${cafe._id}`);
});

app.get("/coffeeshops/:id", async (req, res) => {
  const cafe = await Coffeeshop.findById(req.params.id);
  res.render("coffeeshops/show", { cafe });
});

app.get("/coffeeshops/:id/edit", async (req, res) => {
  const cafe = await Coffeeshop.findById(req.params.id);
  res.render("coffeeshops/edit", { cafe });
});

app.put("/coffeeshops/:id", async (req, res) => {
  const { id } = req.params;
  const cafe = await Coffeeshop.findByIdAndUpdate(id, {
    ...req.body.cafe,
  });
  res.redirect(`/coffeeshops/${cafe._id}`);
});

app.delete("/coffeeshops/:id", async (req, res) => {
  const { id } = req.params;
  const cafe = await Coffeeshop.findByIdAndDelete(id);
  res.redirect("/coffeeshops");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
