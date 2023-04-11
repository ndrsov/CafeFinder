const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/c_fill,w_200');
});

ImageSchema.virtual('hero').get(function () {
  return this.url.replace('/upload', '/upload/c_fill,h_700,w_1400');
});

ImageSchema.virtual('preview').get(function () {
  return this.url.replace('/upload', '/upload/c_fill,h_300,w_500');
});

const opts = { toJSON: { virtuals: true } };

const CoffeeshopSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
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
  },
  opts
);

CoffeeshopSchema.virtual('properties.popUpMarkup').get(function () {
  return `<strong><a href="/coffeeshops/${
    this._id
  }">${this.title}</a></strong><p>${this.description.substring(0, 20)}...</p>`;
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
