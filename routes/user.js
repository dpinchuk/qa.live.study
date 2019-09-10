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
  let payments = req.session.userPayments;

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
        courses,
        payments
      },
    });
  }
});

module.exports = router;