var mongoose = require("mongoose");

var warbleSchema = new mongoose.Schema({
  text: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    ref: "User"
  },
  createdAt: { type: Date, default: Date.now }
});

warbleSchema.pre("save", function(next) {
  let warble = this;
  if (warble.isNew) {
    mongoose
      .model("User")
      .findById(warble.user_id)
      .then(function(user) {
        user.warbles.push(warble._id);
        console.log("warble", warble);
        console.log("warble.username", warble.username);
        console.log("user.username", user.username);
        warble.username = user.username;
        return user.save();
      })
      .then(function() {
        next();
      })
      .catch(function(error) {
        next(error);
      });
  } else {
    next();
  }
});

warbleSchema.post("remove", function() {
  let warble = this;
  mongoose
    .model("User")
    .findById(warble.user_id)
    .then(function(user) {
      user.warbles.pull(warble._id);
      return user.save();
    });
});

var Warble = mongoose.model("Warble", warbleSchema);

module.exports = Warble;
