/* const */
const express = require("express");
const bodyParser = require("body-parser");
const staticAsset = require("static-asset");
const path = require("path");
const config = require("./config");
const routes = require("./routes");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

/*App Object*/
const app = express();

let id = "";
let email = "";

/*Sessions*/
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

/* app.use */
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);
app.use((req, res, next) => {
  delete req.body.__proto__;
  next();
});

/* app.set */
app.set("view engine", "ejs");

/* routers */
app.get("/", (req, res) => {
  id = req.session.userId;
  email = req.session.userEmail;
  res.render("./main", {
    user: {
      id: id,
      email: email,
    },
  });
});

app.use("/user", routes.user);
app.use("/admin", routes.admin);
app.use("/courses", routes.courses);

/* POST requests */
app.use("/", routes.sign);

app.get("/reg", (req, res) => {
  id = req.session.userId;
  email = req.session.userEmail;
  if (!id && !email) {
    res.render("./reg");
  } else {
    res.redirect("/user/account");
  }
});

app.get("/login", (req, res) => {
  id = req.session.userId;
  email = req.session.userEmail;
  if (!id && !email) {
    res.render("./login");
  } else {
    res.redirect("/user/account");
  }
});

app.get("/success", (req, res) => {
  res.render("./success");
});

app.get("/help", (req, res) => {
  res.render("./help");
});

//404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//Error handler
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     console.log(error.stack);
//     res.render('./error', {
//         message: error.message,
//         error: !config.IS_PRODUCTION ? error : {}
//     });
// });
app.use((req, res, next) => {
  res.status(500).json({ err: "500" });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(404).json({ err: "404" });
});

module.exports = app;
