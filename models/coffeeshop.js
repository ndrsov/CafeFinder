const mongoose = require("mongoose");
const Review = require("./review");
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

CoffeeshopSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Coffeeshop", CoffeeshopSchema);
