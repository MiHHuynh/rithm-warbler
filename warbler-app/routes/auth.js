require("dotenv").load();
var express = require("express");
var router = express.Router();
var db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

router.post("/signup", function(request, response) {
  db.User.create(request.body).then(function(user) {
    response.status(201).send(user);
  });
});

router.post("/login", function(req, res, next) {
  db.User.findOne({ username: req.body.username }).then(
    function(user) {
      if (!user) {
        res.status(400).send({ message: "Invalid Credentials" });
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          var token = jwt.sign(
            {
              username: user.username,
              user_id: user.id
            },
            process.env.SECRET_KEY,
            {
              expiresIn: 60 * 60 // expire in one hour
            }
          );
          res.send({
            message: "Authenticated!",
            token: token
          });
        } else {
          res.status(400).send({ message: "Invalid Credentials" });
        }
      });
    },
    function(err) {
      console.log("ERRORS!", err);
    }
  );
});

module.exports = router;
