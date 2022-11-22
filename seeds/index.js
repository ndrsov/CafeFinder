const mongoose = require("mongoose");
const cities = require("./cities");
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
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const cafe = new Coffeeshop({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });
    await cafe.save();
  }
};

seedDB();
