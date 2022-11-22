const mongoose = require("mongoose");
const Coffeeshop = require("../models/coffeeshop");

mongoose
  .connect("mongodb://localhost:27017/cafe-finder")
  .then(() => {
    console.log("Connection with Mongo open");
  })
  .catch((err) => {
    console.log("There was an error");
    console.log(err);
  });

const seedDB = async () => {
  await Coffeeshop.deleteMany({});
  const c = new Coffeeshop({ title: "Purple Bean" });
  await c.save();
};

seedDB();
