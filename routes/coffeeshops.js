const express = require("express");
const router = express.Router();

const coffeeshops = require("../controllers/coffeeshops");

const catchAsync = require("../utilities/catchAsync");
const Coffeeshop = require("../models/coffeeshop");
const { isLoggedIn, isAuthor, validateCafe } = require("../middleware");

router.get("/", catchAsync(coffeeshops.index));

router.get("/new", isLoggedIn, coffeeshops.renderNewForm);

router.post("/", isLoggedIn, validateCafe, catchAsync(coffeeshops.createCafe));

router.get("/:id", catchAsync(coffeeshops.showCafe));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(coffeeshops.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCafe,
  catchAsync(coffeeshops.updateCafe)
);

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(coffeeshops.deleteCafe));

module.exports = router;
