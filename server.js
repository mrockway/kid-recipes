/////////////////
/// server.js ///
/////////////////

// require express and other modules
var express = require('express'),
    app = express(),
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

// require Recipe model
var Recipe = require('./models/recipe');

// Query & return all active recipes from database
app.get('/api/recipes', function (req,res) {
  Recipe.find({active: true}).exec(function (err, allRecipes) {
  if (err) {
    return res.status(500).json({ error: err.message });
  } else {
    res.json(allRecipes);
  }
  });
});

app.post('/api/recipes', function(req,res) {
  // save new recipes from user input
  var newRecipe = new Recipe(req.body);
  newRecipe.save(function(err, savedRecipe) {
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

// catch all route
app.get('*', function(req,res) {
  res.render('index');
});

// listen on port 3000
app.listen(process.env.PORT || 5000, function() {
  console.log("Let's get cooking on PORT", process.env.PORT || 5000);
});
