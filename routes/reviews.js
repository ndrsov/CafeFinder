const express = require("express");
const router = express.Router({ mergeParams: true });

const { reviewSchema } = require("../schemas");
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");

const Coffeeshop = require("../models/coffeeshop");
const Review = require("../models/review");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const cafe = await Coffeeshop.findById(req.params.id);
    const review = new Review(req.body.review);
    cafe.reviews.push(review);
    await review.save();
    await cafe.save();
    res.redirect(`/coffeeshops/${cafe._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Coffeeshop.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/coffeeshops/${id}`);
  })
);

module.exports = router;
