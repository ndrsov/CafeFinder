const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const passport = require("passport");

const users = require("../controllers/users");

router.get("/register", users.renderRegisterForm);

router.post("/register", catchAsync(users.register));

router.get("/login", users.renderLoginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.post("/logout", users.logout);

module.exports = router;
