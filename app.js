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
const cors = require("cors");

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

const corsOptions = { origin: "http://localhost:3030", credentials: true };
/* app.use */
app.use(cors({ origin: true, credentials: true }));
app.use(staticAsset(path.join(__dirname, "/public")));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

// app.use(function(req, res, next) {
//   next();
// });
// app.use(function(req, res, next) {
//   console.log("app.use", req.headers);
//   console.log("app.use method", req.method);
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   } else {
//     next();
//   }
// });

app.locals.getScripts = function(req, res) {
  return app.locals.scripts;
};

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

app.get("/json", async (req, res) => {
  let { userId } = req.session;
  let user;
  const courses = await Courses.find({});
  const articles = await Articles.find({});
  const payments = await Payments.find({});

  if (userId) {
    user = await User.findById(userId, { password: 0 });
  }

  res.json({
    courses,
    articles,
    payments,
    user: user && user,
  });
});

app.use("/user", routes.user);
app.use("/admin", routes.admin);
app.use("/", routes.sign);
/* Курсы */
app.use("/courses", routes.courses);

app.use("/admin-users", require("./db/crud")(User));

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

//404
app.use((req, res) => {
  res.render("./404");
});

module.exports = app;
