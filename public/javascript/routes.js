angular.module("kidsFood")
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/main.html'
			})
			.when('/recipes', {
				templateUrl: 'templates/recipes.html'
			})
			.when('/newrecipe', {
				templateUrl: 'templates/newrecipe.html'
			})
			.when('/recipes/:recipeId', {
				templateUrl: 'templates/recipe.html'
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