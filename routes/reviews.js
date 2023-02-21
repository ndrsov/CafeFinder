const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utilities/catchAsync");
const { validateReview } = require("../middleware");

const Coffeeshop = require("../models/coffeeshop");
const Review = require("../models/review");

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const cafe = await Coffeeshop.findById(req.params.id);
    const review = new Review(req.body.review);
    cafe.reviews.push(review);
    await review.save();
    await cafe.save();
    req.flash("success", "New comment added");
    res.redirect(`/coffeeshops/${cafe._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Coffeeshop.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Comment successfully deleted");
    res.redirect(`/coffeeshops/${id}`);
  })
);

module.exports = router;
