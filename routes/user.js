const express = require("express");
const router = express.Router();

router.get("/account", (req, res) => {
  let id = req.session.userId;
  let email = req.session.userEmail;
  if (!id && !email) {
    res.redirect("/");
  } else {
    res.render("./user-account", {
      user: {
        id: id,
        email: email
      }
    });
  }
});

router.get("/password-recovery", (req, res) => {
  res.render("./password-recovery");
});

module.exports = router;
