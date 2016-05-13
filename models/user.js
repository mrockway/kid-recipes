var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	firstName: String,
  lastName: String,
	password: String,
	recipes: Array

});

var User = mongoose.model('User', UserSchema);

module.exports = User;