var app = angular.module('kidsFood', 
  ['ngRoute', 'ngMaterial', 'ngResource']
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


////////////////////
// Material Theme //
////////////////////

app.config(function($mdThemingProvider){
  $mdThemingProvider.theme('main')
    .primaryPalette('green')
    .accentPalette('deep-purple')
    .warnPalette('deep-orange')
    .backgroundPalette('grey');
});