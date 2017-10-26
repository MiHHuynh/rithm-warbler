var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/WARBLER_DB");

mongoose.Promise = global.Promise;

module.exports.User = require("./user");
module.exports.Warble = require("./warble");
