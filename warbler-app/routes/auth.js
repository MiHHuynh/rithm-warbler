require("dotenv").load();
var express = require("express");
var router = express.Router();
var db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

router.post("/signup", function(request, response) {
  db.User.create(request.body).then(function(user) {
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
    response.status(201).send({message: "Signed up and logged in", token: token});
  });
});

router.post("/login", function(req, res, next) {

  if (!req.body.username) {
    return response.status(400).send({ message: "Please enter valid username." });
  }
  if (!req.body.password) {
    return response.status(400).send({ message: "Please enter valid password." });
  }

  return db.User.findOne({ username: req.body.username }).then(
    function(user) {
      if (!user) {
        return res.status(400).send({ message: "Invalid Credentials; User does not exist" });
      }
      return user.comparePassword(req.body.password, function(err, isMatch) {
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
          return res.send({
            message: "Authenticated!",
            token: token
          });
        } else {
          return res.status(400).send({ message: "Invalid Credentials" });
        }
      });
    },
    function(err) {
      console.log("ERRORS!", err);
    }).catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
