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
const Courses = require("./models/courses");
const Articles = require("./models/articles");
const Payments = require("./models/payments");
const User = require("./models/user");

/*App Object*/
const app = express();

let id;
let email;
let courses;
let articles;
let payments;
let user;

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
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);
app.use((req, res, next) => {
  delete req.body.__proto__;
  next();
});

/* app.set */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").renderFile);

/* routers */
app.get("/", async (req, res) => {
  id = req.session.userId;
  email = req.session.userEmail;

  courses = await Courses.find({});
  articles = await Articles.find({});
  payments = await Payments.find({});
  user = await User.find({email: email});

  console.log(id);
  console.log(email);
  console.log(user);

  res.render("./main", {
    courses,
    articles,
    payments,
    user: {
      id,
      email,
    },
  });
});

app.use("/user", routes.user);
app.use("/admin", routes.admin);

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

app.use((req, res, next) => {
  res.status(500).json({ err: "500" });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(404).json({ err: "404" });
});

module.exports = app;
