var express = require("express");
var router = express.Router();
var db = require("../models");
var mongoose = require("mongoose");
var authMiddleware = require("../middleware/auth");

router.get("/users/:user_id/warbles", function(request, response, next) {
  db.Warble.find({ user_id: request.params.user_id }).then(function(warbles) {
    response.status(200).send(warbles);
  });
});

router.post(
  "/users/:user_id/warbles",
  authMiddleware.loginRequired,
  authMiddleware.ensureCorrectUser,
  function(request, response, next) {
    var properties = { ...request.params, ...request.body };
    db.Warble.create(properties).then(function(warble) {
      response.status(201).send(warble);
    });
  }
);

router.delete("/users/:user_id/warbles/:id", function(request, response, next) {
  db.Warble.findByIdAndRemove(request.params.id).then(function(warble) {
    warble.remove();
    response.status(204).send("Deleted!");
  });
});

router.get("/warbles", function(request, response, next) {
  db.Warble.find({}).sort('-createdAt').limit(100).then(function(warbles) {
    response.status(200).send(warbles);
  });
});

module.exports = router;
