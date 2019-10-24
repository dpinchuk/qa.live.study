const express = require("express");
const router = express.Router();
const User = require("../models/user");

let user;

router.get("/account", async (req, res) => {
  let { userId } = req.session;

  if (!userId) {
    res.redirect("/");
  } else {
    user = await User.findOne({ _id: userId }, { password: 0 }).exec();
    res.render("./user-account", {
      user,
    });
  }
});

module.exports = router;
