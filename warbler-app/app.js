var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var usersRoutes = require("./routes/users");
var warblesRoutes = require("./routes/warbles");
var authRoutes = require("./routes/auth");
var authMiddleware = require("./middleware/auth");

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", authMiddleware.loginRequired, usersRoutes);
app.use("/api", warblesRoutes);
app.use("/api/auth", authRoutes);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});

// module.exports = app;
