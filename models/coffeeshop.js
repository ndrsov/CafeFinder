const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoffeeshopSchema = new Schema({
  title: String,
  image: String,
  avgprice: Number,
  description: String,
  location: String,
});

module.exports = mongoose.model("Coffeeshop", CoffeeshopSchema);
