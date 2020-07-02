const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  logout,
  renderLogin,
} = require("../controllers/authController");
const passport = require("passport");

router.route("/register").get(registerAdmin);

router.route("/login").get(renderLogin);

router.post(
  "/login",
  passport.authenticate("local.signin", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.route("/logout").get(logout);

module.exports = router;
