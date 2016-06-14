/////////////////
/// server.js ///
/////////////////


// require express and other modules
var express = require('express'),
		app = express(),
		auth = require('./resources/auth'),
		bcrypt = require('bcryptjs'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');

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

app.get('/api/me', auth.ensureAuthenticated, function(req,res) {
	User.findById(req.user, function (err, user) {
		res.send(user);
	});
});


// Query & return all active recipes from database
app.get('/api/recipes', function (req,res) {
	Recipe.find({active: true}).populate('user').exec(function (err, allRecipes) {
	
	if (err) {
		return res.status(500).json({ error: err.message });
	} else {
		res.json(allRecipes);
	}
});
	
	// Add check for current user recipes
	
});

app.post('/api/recipes', auth.ensureAuthenticated, function(req,res) {
	User.findById(req.user, function(err, user) {
		if (!user) {
			return res.send({message: "You must be logged in."});
		}
		// save new recipes from user input
		var newRecipe = new Recipe(req.body);
		newRecipe.user = user._id;
		newRecipe.save( function(err, savedRecipe) {
			if (err) {
				res.status(500).json({error: err.message});
			} else {
				// user.recipes.push(newRecipe);
				// user.save();
				res.json(savedRecipe);
			}
		});
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
	console.log('form signup');
	User.findOne({email: req.body.email }, function(err, existingUser) {
		if (existingUser) { 
			return res.status(409).send({message: 'Email is already taken.'}); 
		}
	
		var user = new User({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password
		});

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				
				// set hashed password
				user.password = hash;
				
				// save new user to database after salted and hashed password
				user.save(function(err, result) {
					if (err) {
						res.status(500).send({ message: err.message });
					} else {
						res.send({ token: auth.createJWT(result) });
					}
				});
			});
		});
	});
});

app.post('/auth/login', function(req,res) {
	User.findOne({email: req.body.email }, function(err, user) {
		if (!user) {
			console.log('no user');
			res.status(401).send({message: 'Incorrect username or password.'});
		} 
		
		bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
			if (!isMatch) {
				return res.status(401).send({message: 'Incorrect username or password.'});	
			}
			res.send({token: auth.createJWT(user) });
		});

	});
});

// catch all route
app.get('*', function(req,res) {
	res.render('index');
});

// listen on port 3000
app.listen(process.env.PORT || 5000, function() {
	console.log("Let's get cooking");
});