angular.module('kidsFood')
.controller("MainCtrl", ['$scope', '$auth', '$http', '$location', function($scope, $auth, $http, $location){

	$scope.isAuthenticated = function() {
		$http.get('/api/me').then(function(response){
			if (response.data) {
				$scope.currentUser = response.data;
			} else {
				$auth.removeToken();
			}
			}, function (error) {
				console.error('error message',error);
				$auth.removeToken();
		});
	};

	$scope.isAuthenticated();
	
	$scope.logout = function() {
		
		$auth.logout().then(function() {
			// Set current user to null
			$scope.currentUser = null;
			// Redirect to login page
			$location.path('/login');

		});
	};

}]);