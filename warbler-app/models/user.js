var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  warbles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warble'
  }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;