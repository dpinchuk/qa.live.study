'use strict';

/* const */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const root = path.join(__dirname, "./views");

/* app.use */
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

/* app.set */
app.set("view engine", "ejs");

/* GET requests */
app.get("/", (req, res) => {
  res.sendFile("./main.html", { root });
});
app.get("/reg", (req, res) => {
  res.sendFile("./reg.html", { root });
});
app.get("/success", (req, res) => {
  res.sendFile("./success.html", { root });
});
app.get("/login", (req, res) => {
  res.sendFile("./login.html", { root });
});
app.get("/help", (req, res) => {
  res.sendFile("./help.html", { root });
});
app.get("/password-recovery", (req, res) => {
  res.sendFile("./password-recovery.html", { root });
});
app.get("/courses/manual-qa", (req, res) => {
  res.sendFile("./courses/manual-qa.html", { root });
});
app.get("/courses/java-qa", (req, res) => {
  res.sendFile("./courses/java-qa.html", { root });
});
app.get("/user-account", (req, res) => {
  res.sendFile("./user-account.html", { root });
});

/* POST requests */
app.post("/reg", (req, res) => {
  new User({
    name: req.body.name,
    lastname: req.body.lastname,
    login: req.body.login,
    password: req.body.password,
    role: "student",
    status: true,
    courses: [1, 3]
  }).save((err, doc) => {
    if (err) {
      console.log(err);
      res.redirect("/reg");
    } else {
      console.log("User successfully inserted!", req.body);
      res.redirect("/success");
    }
  });
});

module.exports = app;