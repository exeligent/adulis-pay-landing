const express = require("express");
const router = express.Router();
const { renderHome, sendMessage,subscribe } = require("../controllers/indexController");

router.route("/").get(renderHome);

router.route("/contact").get(sendMessage)

router.route("/subscribe").get(subscribe)
module.exports = router;
