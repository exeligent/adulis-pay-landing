const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const {
  renderHome,
  sendMessage,
  subscribe,
  renderFeature,
} = require("../controllers/indexController");

router.route("/").get(renderHome);

router.route("/contact").post(bodyParser.json(), sendMessage);

router.route("/subscribe").post(bodyParser.json(), subscribe);

router.route("/feature").get(renderFeature);
module.exports = router;
