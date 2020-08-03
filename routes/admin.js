const express = require("express");
const router = express.Router();
const {
  renderDashboard,
  renderMessages,
  renderSubscribers,
  renderRegister,
} = require("../controllers/adminController");

router.route("/").get(isLoggedIn, renderDashboard);

router.route("/messages").get(isLoggedIn, renderMessages);

router.route("/subscribers").get(isLoggedIn, renderSubscribers);

router.route("/register").get(isLoggedIn, renderRegister);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "You must be logged in first!");
  res.redirect("/user/login");
}
module.exports = router;
