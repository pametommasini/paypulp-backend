// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const validateToken = require("./middlewares/validateToken");
const { validateResult } = require('./middlewares/validators/validateHelper');
const { validateSignup } = require('./middlewares/validators/signupValidator');
const { validateLogin } = require('./middlewares/validators/loginValidator');
const app = express();

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use("/private", validateToken, require("./routes"));

// public routes
app.post("/login", validateLogin, require("./controllers/Auth/loginController"));
app.post("/signup", validateSignup, validateResult, require("./controllers/Auth/signupController"));

// routes
 app.use("/private", require("./routes"));

/* // catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}); */

module.exports = app;
