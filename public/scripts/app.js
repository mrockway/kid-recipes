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

	});

}]);

app.controller("RecipeCtrl", ['$scope', '$routeParams', 'Recipe', function($scope, $routeParams, Recipe) {
	

	var recipeId = $routeParams.recipeId;

	$scope.foundRecipe = Recipe.get({ id: recipeId });

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
		// $scope.recipe = {
		// 	active: true,
		// 	name: '',
		// 	mealType: {},
		// 	ingredients: [{ name: '' }],
		// 	comment: ''
		// };

		// [1,2,3].forEach(function(i) {
		// 	$scope.recipe.ingredients.push({name: ''});	
		// });

	};

}]);