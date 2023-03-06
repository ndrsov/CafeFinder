const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CoffeeshopSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  avgprice: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

CoffeeshopSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Coffeeshop', CoffeeshopSchema);
