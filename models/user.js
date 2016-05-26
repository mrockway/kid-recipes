var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	firstName: String,
  lastName: String,
	password: String
	// recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;