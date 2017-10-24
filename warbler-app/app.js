var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var usersRoutes = require("./routes/users");
var warblesRoutes = require("./routes/warbles");

app.use(morgan("tiny"));
app.use(bodyParser.json()); // we need this to parse JSON!
app.use(bodyParser.urlencoded({extended:true}));

app.use('/users', usersRoutes);
app.use('/users', warblesRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
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

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});

// module.exports = app;