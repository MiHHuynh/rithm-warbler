var mongoose = require('mongoose');
mongoose.set('debug', true); // this will log the mongo queries to the terminal
mongoose.connect('mongodb://localhost/WARBLER_DB'); // connect to the DB

mongoose.Promise = global.Promise // let's use ES2015 promises for mongoose! No callbacks necessary!

module.exports.User = require('./user')
module.exports.Warble = require('./warble')