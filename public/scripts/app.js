var app = angular.module("kidsFood", ['ngRoute', 'ngResource']);

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

app.factory('Recipe', ['$resource', function($resource) {
	return $resource('/api/recipes/:id', { id: '@_id' },
	{
		'update': { method:'PUT' }
	});
}]);

/////////////////
// Controllers //
/////////////////

app.controller("RecipesCtrl", ['$scope', 'Recipe', function($scope, Recipe) {

	$scope.recipes = Recipe.query(function() {
		console.log('response',$scope.recipes);
	});

	$scope.filterMealType = function(meal) {
		$scope.mealType = meal;
		return $scope.mealType;
	};

}]);

app.controller("RecipeCtrl", ['$scope', '$routeParams', 'Recipe', function($scope, $routeParams, Recipe) {
	var recipeId = $routeParams.recipeId;
	$scope.foundRecipe = Recipe.get({ id: recipeId });

	console.log('found recipe',$scope.foundRecipe);

	$scope.updateRecipe = function() {

		var alterRecipe = $scope.foundRecipe;
		var meals = [];
		console.log('form submit', alterRecipe);
		for (var meal in $scope.updateRecipe.mealType) {
			meals.push(meal);
		}
		if (meals.length > 0) {
			alterRecipe.mealType = meals;
		}

		Recipe.update(alterRecipe);	
	};
	
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

	$scope.recipe = {
		active: true,
		name: '',
		mealType: {},
		ingredients: [{
			name: '',
			quantity: ''
		}],
		comment: ''
	};

	$scope.addMoreIngredients = function() {
		$scope.recipe.ingredients.push({
			name: '',
			quantity: ''
		});
	};

	$scope.addRecipe = function() {
		var newRecipe = $scope.recipe;
		var meals = [];
		for (var meal in newRecipe.mealType) {
			meals.push(meal);
		}
		newRecipe.mealType = meals;
		console.log(newRecipe);
		Recipe.save(newRecipe, function(data) {
			console.log("Recipe saved");
		}, function(error) {
			console.log('error', error);
		});

	};

}]);