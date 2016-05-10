var app = angular.module("kidsFood", ['ngRoute', 'ngResource', 'satellizer']);

////////////
// Routes //
////////////

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/recipes.html',
			controller: 'RecipesCtrl'
		})
		.when('/newrecipe', {
			templateUrl: 'templates/newrecipe.html',
			controller: 'NewRecipeCtrl'
		})
		.when('/recipes/:recipeId', {
			templateUrl: 'templates/recipe.html',
			controller: 'RecipeCtrl'
		})
		.when('/signup', {
			templateUrl: 'templates/signup.html',
			controller: 'AuthCtrl'
		})
		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'AuthCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

		$locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });

}]);

/////////////
// Factory //
/////////////

// Create recipe CRUD routes
app.factory('Recipe', ['$resource', function($resource) {
	return $resource('/api/recipes/:id', { id: '@_id' },
	{
		'update': { method:'PUT' }
	});
}]);

/////////////////
// Controllers //
/////////////////

// Controller for the 'Home Page'
app.controller("RecipesCtrl", ['$scope', 'Recipe', function($scope, Recipe) {

	// Get all active recipes from the database for all users
	$scope.recipes = Recipe.query(function() {});


}]);

// Controller for individual recipe pages
app.controller("RecipeCtrl", ['$scope', '$routeParams', 'Recipe', function($scope, $routeParams, Recipe) {

	// Get recipe ID from the URL
	var recipeId = $routeParams.recipeId;

	// Query database for specific recipe
	$scope.foundRecipe = Recipe.get({ id: recipeId });

	// Edit recipe function
	$scope.updateRecipe = function() {

		// Variable holding the recipe sent from the form
		var alterRecipe = $scope.foundRecipe;

		// Empty array to hold the updated recipes meal types
		var meals = [];
		
		// Loop to remove the true/false value from the checkboxes
		for (var meal in $scope.updateRecipe.mealType) {
			meals.push(meal);
		}
		// Conditional to determine if any changes where made
		if (meals.length > 0) {
			alterRecipe.mealType = meals;
		}

		// Update the existing recipe
		Recipe.update(alterRecipe);	
	};
	
	// Function to add 1 more ingredient to the form
	$scope.addMoreIngredients = function() {
		$scope.foundRecipe.ingredients.push({
			name: '',
			quantity: null
		});
	};

	// Does not remove recipe from DB only marks as inactive
	$scope.removeRecipe = function() {
		$scope.foundRecipe.active = false;
		Recipe.update($scope.foundRecipe);
	};

}]);

app.controller("NewRecipeCtrl", ['$scope', 'Recipe', function($scope, Recipe) {

	function blankRecipe() {
		$scope.recipe = {
			active: true,
			name: '',
			mealType: {},
			ingredients: [{ name: '' }],
			comment: ''
		};

		[1,2,3].forEach(function(i) {
			$scope.recipe.ingredients.push({name: ''});	
		});
	}

	blankRecipe();
	

	$scope.addMoreIngredients = function() {
		$scope.recipe.ingredients.push({
			name: ''
		});
	};

	$scope.addRecipe = function() {
		var newRecipe = $scope.recipe;
		var meals = [];
		var ingredients = [];
		for (var meal in newRecipe.mealType) {
			meals.push(meal);
		}
		newRecipe.mealType = meals;

		for (var i = 0; i < newRecipe.ingredients.length; i++) {
			console.log(newRecipe.ingredients[i].name);
			if (newRecipe.ingredients[i].name !== '') {
				console.log('i',i);
				ingredients.push({name: newRecipe.ingredients[i].name});
			}
		}

		newRecipe.ingredients = ingredients;

		console.log('newRecipe',newRecipe);
		Recipe.save(newRecipe);

		blankRecipe();
		
	};

}]);

app.controller("AuthCtrl", ['$scope', '$location', '$auth', function($scope, $location, $auth) {
		
		$scope.signupForm = function() {
			
			$auth.signup($scope.newUser)
				.then(function(response) {
					
					$auth.setToken(response.data.token);
					console.log(response.data.token);
					//$scope.isAuthenticated();	

					$scope.newUser = {};

					$location.path('/');
				}, function(error) {
					console.error(error);
				});
				
		};

		$scope.userLogin = function() {
			var user = $scope.user;
			console.log('user', user);
		};

}]);

