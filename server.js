/////////////////
/// server.js ///
/////////////////


// require express and other modules
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		auth = require('./resources/auth');
// configure bodyParser to send and receive JSON form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect(
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/kids_recipes'
);

// require Recipe & User models
var Recipe = require('./models/recipe');
var User = require('./models/user');

// Query & return all active recipes from database
app.get('/api/recipes', function (req,res) {

	// Send back all active recipes from the database
	Recipe.find({'active':true}, function (err, allRecipes) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(allRecipes);
		}
	});
	// filtering will be done w/angular
});

app.post('/api/recipes', function(req,res) {
	// save new recipes from user input
	var newRecipe = new Recipe(req.body);
	newRecipe.save( function(err, savedRecipe) {
		if (err) {
			res.status(500).json({error: err.message});
		} else {
			res.json(savedRecipe);
		}
	});
});

app.get('/api/recipes/:id', function(req,res) {
	// show single recipe
	Recipe.findOne({_id: req.params.id}, function(err, foundRecipe) {
		res.json(foundRecipe);
	});
});

app.put('/api/recipes/:id', function(req,res) {
	// edit single recipe
	Recipe.findOneAndUpdate({_id: req.params.id},req.body, function(err,updatedRecipe) {
		if (err) {
			res.status(500).json({error: err.message});
		} else {
			console.log("updated recipe", updatedRecipe);
			res.json(updatedRecipe);
		}
	});
});

app.delete('/api/recipes/:id', function(req,res) {
	// delete single recipe
	// possibly alter the recipe status to avoid complete deletion
});

app.post('/auth/signup', function(req,res) {

	User.findOne({email: req.body.email }, function(err, existingUser) {
		if (existingUser) { 
			return res.status(409).send({message: 'Email is already taken.'}); 
		}
	
		console.log('req body',req.body);
	
		var newUser = new User({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password
		});


	newUser.save(function(err,result) {
		if (err) {
			res.status(500).json({error: err.message});
		} else {
			res.send({ token: auth.createJWT(result) });
		}

	});
});
});

// serve index page for all routes
app.get('*', function(req,res) {
	res.render('index');
});

// listen on port 3000
app.listen(process.env.PORT || 5000, function() {
	console.log('server running');
});