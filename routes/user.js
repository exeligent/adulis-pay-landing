const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  logout,
  renderLogin,
} = require("../controllers/authController");
const passport = require("passport");

router.route("/register").post(registerAdmin);

router.route("/login").get(renderLogin);

router.post(
  "/login",
  passport.authenticate("local.signin", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true,
  })
);

router.route("/logout").get(isLoggedIn, logout);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "You must be logged in first!");
  res.redirect("/user/login");
}
module.exports = router;
