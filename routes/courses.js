const express = require("express");
const router = express.Router();
const Course = require("../models/courses");

router.get("/", (req, res) => {
  Course.find({}, (err, course) => {
    course.toArray((err, items) => {
      console.log(items);
    });
  }); return courses;
});

module.exports = router;