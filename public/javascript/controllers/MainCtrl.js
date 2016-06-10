angular.module('kidsFood')
.controller("MainCtrl", ['$scope', '$auth', '$http', '$location', '$mdBottomSheet', function($scope, $auth, $http, $location, $mdBottomSheet){

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

	$scope.showMobileMenu = function() {
		$mdBottomSheet.show({
			templateUrl: './templates/partials/bottom-sheet.html',
			controller: 'MainCtrl'
		});
	};

	$scope.mobileMenuClick = function(logout) {
		if (logout == 'logout') {
			$scope.logout().then($mdBottomSheet.hide({}));
		}
		$mdBottomSheet.hide({});
	};


	$scope.cardInfo = [{title: 'Create', content: 'Create and store your recipes online and bring them with you everywhere you go.'},
										 {title: 'Discover', content:'Get ideas from other members to try out with your own family'},
										 {title: 'Share', content: 'Share your recipes with other members or keep them all to yourself.'}
										];




}]);

