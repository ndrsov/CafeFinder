const Coffeeshop = require("../models/coffeeshop");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const cafe = await Coffeeshop.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  cafe.reviews.push(review);
  await review.save();
  await cafe.save();
  req.flash("success", "New comment added");
  res.redirect(`/coffeeshops/${cafe._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Coffeeshop.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Comment successfully deleted");
  res.redirect(`/coffeeshops/${id}`);
};
