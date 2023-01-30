const express = require("express");
const router = express.Router();

const { coffeeshopSchema } = require("../schemas");
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const Coffeeshop = require("../models/coffeeshop");

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

router.get("/new", (req, res) => {
  res.render("coffeeshops/new");
});

router.post(
  "/",
  validateCafe,
  catchAsync(async (req, res, next) => {
    // if (!req.body.cafe) throw new ExpressError("Invalid coffeeshop data", 400);
    const cafe = new Coffeeshop(req.body.cafe);
    await cafe.save();
    res.redirect(`/coffeeshops/${cafe._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const cafe = await Coffeeshop.findById(req.params.id).populate("reviews");
    res.render("coffeeshops/show", { cafe });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const cafe = await Coffeeshop.findById(req.params.id);
    res.render("coffeeshops/edit", { cafe });
  })
);

router.put(
  "/:id",
  validateCafe,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const cafe = await Coffeeshop.findByIdAndUpdate(id, {
      ...req.body.cafe,
    });
    res.redirect(`/coffeeshops/${cafe._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const cafe = await Coffeeshop.findByIdAndDelete(id);
    res.redirect("/coffeeshops");
  })
);

module.exports = router;
