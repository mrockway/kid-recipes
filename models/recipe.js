var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	active: Boolean,
	comment: String,
	ingredients: Array,
	mealType: Array,
	name: String,
	public: Boolean,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;