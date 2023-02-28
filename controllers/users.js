const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("auth/register");
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Thanks for registering, Welcome to CafeFinder!");
      res.redirect("/coffeeshops");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("auth/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome Back!");
  res.redirect("/coffeeshops");
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You signed out of your account, Goodbye!");
    res.redirect("/coffeeshops");
  });
};
