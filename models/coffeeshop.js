const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoffeeshopSchema = new Schema({
  title: String,
  image: String,
  avgprice: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Coffeeshop", CoffeeshopSchema);
