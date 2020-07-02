const express = require("express");
const router = express.Router();
const {
  renderDashboard,
  renderMessages,
  renderSubscribers,
  renderRegister,
} = require("../controllers/adminController");

router.route("/").get(renderDashboard);

router.route("/messages").get(renderMessages);

router.route("/subscribers").get(renderSubscribers);

router.route("/register").get(renderRegister);

module.exports = router;
