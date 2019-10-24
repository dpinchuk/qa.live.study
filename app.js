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
app.use(staticAsset(path.join(__dirname, "/public")));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/js", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));

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
  const { userId } = req.session;
  let user = null;

  const courses = await Courses.find({});
  const articles = await Articles.find({});
  const payments = await Payments.find({});
  if (userId) {
    user = await User.findOne({ _id: userId }, { password: 0 }).exec();
  }
  res.render("./main", {
    courses,
    articles,
    payments,
    user,
  });
});

app.use("/user", routes.user);
app.use("/admin", routes.admin);

app.use("/", routes.sign);

app.get("/registration", (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    res.render("./registration");
  } else {
    res.redirect("/user/account");
  }
});

app.get("/login", (req, res) => {
  const { userId } = req.session;
  if (!userId) {
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

app.get("/courses/manual-qa", (req, res) => {
  res.render("../views/courses/manual-qa");
});

//404
app.use((req, res) => {
  res.render("./404");
});


module.exports = app;