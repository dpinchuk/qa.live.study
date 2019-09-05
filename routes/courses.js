const express = require("express");
const router = express.Router();
const path = require("path");
const root = path.join(__dirname, "../views");

router.get("/manual-qa", (req, res) => {
  res.sendFile("./courses/manual-qa.html", { root });
});

router.get("/java-qa", (req, res) => {
  res.sendFile("./courses/java-qa.html", { root });
});

module.exports = router;
