const express = require("express");
const consts = require("../static/const");
const isValidateRegex = require("../utils/utils");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const router = express.Router();

// POST Registration
router.post("/reg", (req, res) => {
  const name = req.body.name.trim();
  const lastName = req.body.lastName.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const confirmPass = req.body.confirmPass;

  // Проверка данных пользователя при регистрации
  if (!email || !password || !confirmPass) {
    res.json({
      success: false,
      error: "Some fields are not filled.",
      fields: ["email", "password", "confirmPass"],
    });
  } else if (name.length !== 0 && !isValidateRegex(name, consts.NAME_PATTERN)) {
    res.json({
      success: false,
      error:
        "Name must be between " +
        consts.USER_NAME_MIN_LENGTH +
        " and " +
        consts.USER_NAME_MAX_LENGTH +
        " characters and contains characters: [A-Za-zА-Яа-я0-9]",
      fields: ["name"],
    });
  } else if (
    lastName.length !== 0 &&
    !isValidateRegex(lastName, consts.NAME_PATTERN)
  ) {
    res.json({
      success: false,
      error:
        "LastName must be between " +
        consts.USER_LAST_NAME_MIN_LENGTH +
        " and " +
        consts.USER_LAST_NAME_MAX_LENGTH +
        " characters contains characters: [A-Za-zА-Яа-я0-9]",
      fields: ["lastName"],
    });
  } else if (!isValidateRegex(password, consts.PASSWORD_PATTERN)) {
    res.json({
      success: false,
      error:
        "The password must be between " +
        consts.PASSWORD_MIN_LENGTH +
        " and " +
        consts.PASSWORD_MAX_LENGTH +
        " characters.",
      fields: ["password"],
    });
  } else if (password !== confirmPass) {
    res.json({
      success: false,
      error: "Passwords don't match.",
      fields: ["password", "confirmPass"],
    });
  } else if (!isValidateRegex(email, consts.EMAIL_PATTERN)) {
    res.json({
      success: false,
      error: "Email is not valid.",
      fields: ["email"],
    });
  } else {
    User.findOne({
      email: email,
    }).then(user => {
      if (!user) {
        console.log(req.body);
        bcrypt.hash(password, null, null, (err, hash) => {
          User.create({
            name: name,
            lastName: lastName,
            email: email,
            password: hash,
          })
            .then(user => {
              /********************************************************************************************************/
              req.session.userId = user.id;
              /********************************************************************************************************/

              res.json({
                success: true,
                user: {
                  name: req.body.name,
                  lastName: req.body.lastName,
                  email: req.body.email,
                },
              });
            })
            .catch(err => {
              res.json({
                success: false,
                error: err,
              });
            });
        });
      } else {
        res.json({
          success: false,
          error: "User already exists",
          fields: ["email"],
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  if (!email || !password) {
    res.json({
      success: false,
      error: "Some fields are not filled.",
      fields: ["email", "password"],
    });
  } else if (!isValidateRegex(email, consts.EMAIL_PATTERN)) {
    res.json({
      success: false,
      error: "Unknown user",
      fields: ["email", "password"],
    });
  } else if (!isValidateRegex(password, consts.PASSWORD_PATTERN)) {
    res.json({
      success: false,
      error: "Unknown user",
      fields: ["email", "password"],
    });
  } else {
    User.findOne({
      email: email,
    })
      .then(user => {
        if (!user || user.status !== "active") {
          res.json({
            success: false,
            error: "User does not exist or is blocked",
            fields: ["email", "password"],
          });
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
              res.json({
                success: false,
                error: "Unknown user",
                fields: ["email", "password"],
              });
            } else {
              /********************************************************************************************************/
              req.session.userId = user.id;
              /********************************************************************************************************/

              res.json({
                success: true,
              });
            }
          });
        }
      })
      .catch(err => {
        res.json({
          success: false,
          error: "Unknown user!",
        });
      });
  }
});

// GET for logout
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.redirect("/");
});

module.exports = router;
