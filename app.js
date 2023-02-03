// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config({path:'./.env'});
const validateToken = require('./middlewares/validateToken');
const routes = require('./routes');
const indexRouter = require("./routes");

const app = express();

// middlewares
app.use(logger("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/secure-request', validateToken, routes);


// routes
app.use("/api", require("./routes"));

// jwt login
app.post('/login', require('./controllers/loginController'));

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

app.listen(3000, () => console.log('server started'));

module.exports = app;
