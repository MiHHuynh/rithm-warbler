var express = require("express");
var router = express.Router();
var db = require("../models");
var mongoose = require("mongoose");
var authMiddleware = require("../middleware/auth");

router.get("/", function(request, response, next) {
  db.User.find().then(function(users) {
    response.status(200).send(users);
  });
});

router.get("/:id", function(request, response, next) {
  db.User.findById(request.params.id).then(function(user) {
    response.status(200).send(user);
  });
});

router.patch("/:id/following",
  authMiddleware.loginRequired,
  authMiddleware.ensureCorrectUser,
  function(request, response, next) {
    var req = request;
    db.User.findByIdAndUpdate(request.params.id, { $addToSet: { following: request.body.followee_id } })
    .then(function(user) {
      db.User.findByIdAndUpdate(req.body.followee_id, { $addToSet: { followers: user.id } })
    })
    .then(function(user) {
      response.status(200).send(user);
    });
});

router.post("/", function(request, response, next) {
  db.User.create(request.body).then(function(user) {
    response.status(201).send(user);
  });
});

router.patch("/:id", function(request, response, next) {
  db.User
    .findByIdAndUpdate(request.params.id, request.body)
    .then(function(user) {
      response.status(200).send(user);
    });
});

router.delete("/:id", function(request, response, next) {
  db.User.findByIdAndRemove(request.params.id).then(function(user) {
    response.status(204).send("Deleted!");
  });
});

module.exports = router;
