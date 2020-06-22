const express = require("express");
const router = express.Router();
const { renderHome } = require("../controllers/indexController");

router.route("/").get(renderHome);

module.exports = router;
