const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/users", (req, res) => {
  User.find({}).then(users => {
    res.render("admin/users", { users: users });

  });
});

module.exports = router;