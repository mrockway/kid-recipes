var app = angular.module('kidsFood', 
	['ngRoute',
	 'ngMaterial',
	 'ngResource',
	 'satellizer'
	 ]
);

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
