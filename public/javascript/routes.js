angular.module("kidsFood")
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'templates/main.html',
				controllerAs: 'MainCtrl'
			})
			.when('/recipes', {
				templateUrl: 'templates/recipes.html',
				controllerAs: 'controllers/RecipesCtrl'
			})
			.when('/newrecipe', {
				templateUrl: 'templates/newrecipe.html',
				controllerAs: 'controllers/RecipesCtrl'
			})
			.when('/recipes/:recipeId', {
				templateUrl: 'templates/recipe.html',
				controllerAs: 'controllers/RecipesCtrl'
			})
			.when('/signup', {
				templateUrl: 'templates/signup.html',
				controllerAs: 'controllers/AuthCtrl'
			})
			.when('/login', {
				templateUrl: 'templates/login.html',
				controllerAs: 'controllers/AuthCtrl'
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