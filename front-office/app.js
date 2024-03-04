const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");

const articlesRouter = require("./routes/articles");
const authRouter = require("./routes/auth");
const unAuthMiddleware = require("../shared/middleware/unauth-middleware");

const app = express();

// view config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./../shared/views"));
// config
dotenv.config({
  path: path.join(__dirname, "./../shared/.env"),
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./../shared/public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// routes
//______________________________________________________________________

app.use("/logout", (req, res) => {
  delete req.session.user;
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.redirect("/articles");
});

app.use("/auth", unAuthMiddleware, authRouter);

app.use("/articles", articlesRouter);

//______________________________________________________________________

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  try {
    next(createError(404));
  } catch (err) {}
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  console.log(err);
  res.render("pages/errors", { status: err.status || 500, error: err });
});

module.exports = app;
