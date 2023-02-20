const express = require("express");
const router = express.Router();

const { coffeeshopSchema } = require("../schemas");
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const Coffeeshop = require("../models/coffeeshop");
const { isLoggedIn } = require("../middleware");

const validateCafe = (req, res, next) => {
  const { error } = coffeeshopSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const cafes = await Coffeeshop.find({});
    res.render("coffeeshops/index", { cafes });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("coffeeshops/new");
});

router.post(
  "/",
  isLoggedIn,
  validateCafe,
  catchAsync(async (req, res, next) => {
    const cafe = new Coffeeshop(req.body.cafe);
    cafe.author = req.user._id;
    await cafe.save();
    req.flash("success", "Succesfully made a new café");
    res.redirect(`/coffeeshops/${cafe._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const cafe = await Coffeeshop.findById(req.params.id)
      .populate("reviews")
      .populate("author");
    if (!cafe) {
      req.flash("error", "Cannot find that specific café");
      return res.redirect("/coffeeshops");
    }
    res.render("coffeeshops/show", { cafe });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const cafe = await Coffeeshop.findById(req.params.id);
    if (!cafe) {
      req.flash("error", "Cannot find that specific café");
      return res.redirect("/coffeeshops");
    }
    res.render("coffeeshops/edit", { cafe });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateCafe,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const cafe = await Coffeeshop.findByIdAndUpdate(id, {
      ...req.body.cafe,
    });
    req.flash("success", "Succesfully updated café");
    res.redirect(`/coffeeshops/${cafe._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const cafe = await Coffeeshop.findByIdAndDelete(id);
    req.flash("success", "Succesfully deleted café");
    res.redirect("/coffeeshops");
  })
);

module.exports = router;
