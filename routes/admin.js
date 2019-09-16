const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Courses = require("../models/courses");

router.get("/", (req, res) => {
  User.find({}).then((users, courses) => {
    res.render("../views/admin/admin", {
      users: users,
      courses: courses
    });
  });
});

router.get("/users", (req, res) => {
  User.find({}).then(users => {
    res.render("../views/admin/users", { users: users });
  });
});

router.get("/courses", (req, res) => {
  Courses.find({}).then(courses => {
    res.render("../views/admin/courses", { courses: courses });
  });
});

router.get("/properties", (req, res) => {
  Courses.find({}).then(courses => {
    res.render("../views/admin/properties");
  });
});

module.exports = router;