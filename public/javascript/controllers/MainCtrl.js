angular.module('kidsFood')
.controller("MainCtrl", ['$scope', '$http', '$mdBottomSheet', function($scope, $http, $mdBottomSheet){

	$scope.showMobileMenu = function() {
		$mdBottomSheet.show({
			templateUrl: './templates/partials/bottom-sheet.html',
			controller: 'MainCtrl'
		});
	};
}]);

