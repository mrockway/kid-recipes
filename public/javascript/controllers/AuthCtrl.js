angular.module('kidsFood')
.controller("AuthCtrl", ['$scope', '$location', '$auth', function($scope, $location, $auth) {
		
		$scope.signup = function() {
			
			$auth.signup($scope.user)
				.then(function(response) {

					// Set JWT into local storage
					$auth.setToken(response.data.token);
					
					// Set currentUser
					$scope.isAuthenticated();

					// Clear sign up form
					$scope.newUser = {};

					// Redirect to main recipe page
					$location.path('/');

				}, function(error) {
					// Add flash message for signup error
					console.error(error);
				});
		};
			

		$scope.login = function() {

			$auth.login($scope.user)
				.then(function (response) {

					// Set JWT into local storage
					$auth.setToken(response.data.token);

					// Set currentUser
					$scope.isAuthenticated();

					// Clear login form
					$scope.user = {};

					// Redirect to home page
					$location.path('/');

				}, function(error) {
					// add flash message for login error
					console.error(error);
				}); 
		};

}]);
