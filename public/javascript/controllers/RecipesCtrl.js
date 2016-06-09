angular.module('kidsFood')
.controller("RecipesCtrl", ['$scope', function($scope) {

	// Array of meal types for Recipes
	$scope.meals = ['breakfast', 'lunch', 'snack', 'dinner'];

	// Function to check for item in array and returns the index
	$scope.exists = function (item, list) {
  	return list.indexOf(item) > -1;
	};

	// Function to update an array based on if the value is in the array
	$scope.toggle = function (item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(item);
		}
	};

	// Function to add 1 more ingredient to the recipe form
	$scope.addMoreIngredients = function(recipe) {
		console.log(recipe);
		recipe.ingredients.push('');
	};

}]);
////////////////////////////////
// Display Recipes Controller //
////////////////////////////////
	
app.controller("ViewRecipesCtrl", ['$scope', 'Recipe', function($scope, Recipe) {

	// Declare initial variables for Recipes page
	$scope.mealType = '';
	$scope.personalRecipes = true;
	$scope.recipeCollection = "See only my recipes";
	$scope.userSelection = $scope.currentUser._id || '';

	// Get all recipes from the database
	if ($scope.currentUser) {
		$scope.recipes = Recipe.query({userID: $scope.currentUser._id, active: false},function() {
			console.log('recipes query',$scope.recipes);
			// add logic to show only logged in user recipes, unless no user logged in then show all
			//$scope.userID = $scope.currentUser._id;

		});
	} else if(!personalRecipes) {
		$scope.recipes = Recipe.query({active: true},function() {
		console.log('recipes query',$scope.recipes);

	});
	}

	// Toggle switch function to change the recipes displayed on the page
	$scope.recipeListChange = function(personalRecipes) {
		if (personalRecipes) {
			$scope.recipeCollection = "See only my recipes";
			$scope.userSelection = $scope.currentUser._id;
		} else {
			$scope.recipeCollection = "Browse the community";
			$scope.userSelection = '';
		}
		personalRecipes = !personalRecipes;
	};
	

}]);
	
//////////////////////////////
// Single Recipe Controller //
//////////////////////////////

app.controller("SingleRecipeCtrl", ['$scope', '$routeParams','Recipe', function($scope, $routeParams, Recipe) {

	// Get recipe ID from the URL
	var recipeId = $routeParams.recipeId; // just declare and use ng-click to assign ID when selecting a recipe????

	// Query database for specific recipe
	//////////  Add this into function after clicking on a link for recipe, may not have to make another api call, recipes already loaded in system
	$scope.foundRecipe = Recipe.get({ id: recipeId }, function() {
		// displays recipe
	});

	$scope.toggleForm = function() {
		$scope.editForm = !$scope.editForm;
	};

	// Edit recipe function
	$scope.updateRecipe = function() {
		for (var i = 0; i < $scope.foundRecipe.ingredients.length; i++) {
			if ($scope.foundRecipe.ingredients[i] === '') {
				$scope.foundRecipe.ingredients.splice(i,1);
			}
		}
	
	// Update the existing recipe
		Recipe.update($scope.foundRecipe);	
	};

	// Does not remove recipe from DB only marks as inactive
	$scope.removeRecipe = function() {
		var deleteRecipe = confirm("Are you sure you want to delete");
		if (deleteRecipe) {
			$scope.foundRecipe.active = false;
			Recipe.update($scope.foundRecipe);	
		}
	};

}]);
	
///////////////////////////
// New Recipe Controller //
///////////////////////////

app.controller("NewRecipeCtrl", ['$scope', 'Recipe', function($scope, Recipe) {
	function blankRecipe() {
		$scope.recipe = {
			active: true,
			name: '',
			mealType: [],
			ingredients: ['','',''],
			comment: ''
		};
	}

	blankRecipe();

	// Saves recipe to DB
	$scope.addRecipe = function() {

		for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
			if ($scope.recipe.ingredients[i] === '') {
				$scope.recipe.ingredients.splice(i,1);
			}
		}

		Recipe.save($scope.recipe, function (response) {
			console.log('success save',response);
		}, function(err) {
			console.log('You must be logged in',err);
		});

		blankRecipe();
		
	};

}]);	