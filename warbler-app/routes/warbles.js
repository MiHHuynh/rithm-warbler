var express = require("express");
var router = express.Router();
var db = require('../models');
var mongoose = require ('mongoose');

router.get('/:user_id/warbles', function(request, response, next) {
  db.Warble.find({user_id: request.params.user_id}).then(function(warbles) {
    response.status(200).send(warbles);
  });
})

// router.get('/:user_id/warbles/:id', function(request, response, next) {
//   db.Warble.findById(request.params.id).then(function(warble){
//     response.status(200).send(warble);
//   });
// })

router.post('/:user_id/warbles', function(request, response, next) {
  var properties = {...request.params, ...request.body};
  db.Warble.create(properties).then(function(warble){
    response.status(201).send(warble);
  });
})

router.delete('/:user_id/warbles/:id', function(request, response, next) {
  // find the warble by itself?
  // call remove on the warble
  // for the document instead of the model
  // and then delete from the model
  db.Warble.findByIdAndRemove(request.params.id).then(function(warble){
    response.status(204).send('Deleted!');
  })
})

module.exports = router;