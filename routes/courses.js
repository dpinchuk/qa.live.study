const express = require("express");
const router = express.Router();

// manual-qa
router.get("/manual-qa", (req, res) => {
  let lessons = require("../json/lessons/lessons-manual-qa.json");
  let name = "Мануальное тестирование ПО";
  let image = "manual-course.png";
  res.render("../views/layouts/courses_lessons/lessons-qa", {
    lessons: lessons,
    name: name,
    image: image,
  });
});

//java-qa
router.get("/java-qa", (req, res) => {
  let lessons = require("../json/lessons/lessons-java-qa.json");
  let name = "Курс по Java для тестировщиков";
  let image = "java-qa-course.png";
  res.render("../views/layouts/courses_lessons/lessons-qa", {
    lessons: lessons,
    name: name,
    image: image,
  });
});

module.exports = router;
