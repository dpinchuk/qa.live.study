const express = require("express");
const router = express.Router();

router.get("/account", (req, res) => {

  let id = req.session.userId;
  let name = req.session.userName;
  let lastName = req.session.userLastName;
  let email = req.session.userEmail;
  let role = req.session.userRole;
  let status = req.session.userStatus;
  let tariff = req.session.userTariff;
  let expirationDate = req.session.userExpirationDate;
  let courses = req.session.userCourses;

  // let id = user.id;
  // let name = user.name;
  // let lastName = user.lastName;
  // let email = user.email;
  // let role = user.role;
  // let status = user.status;
  // let tariff = user.tariff;
  // let expirationDate = user.expirationDate;
  // let courses = user.courses;

  if (!id && !email) {
    res.redirect("/");
  } else {
    res.render("./user-account", {
      user: {
        id,
        name,
        lastName,
        email,
        role,
        status,
        tariff,
        expirationDate,
        courses
      },
    });
  }
});

module.exports = router;