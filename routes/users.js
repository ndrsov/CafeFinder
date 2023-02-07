const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.flash("success", "Thanks for registering, Welcome to CafeFinder!");
      res.redirect("/coffeeshops");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    }
  })
);

module.exports = router;
