angular.module('kidsFood')
.controller("HeaderCtrl", ['$scope','$mdBottomSheet', function($scope,$mdBottomSheet){

	$scope.showMobileMenu = function() {
		$mdBottomSheet.show({
			templateUrl: './templates/partials/bottom-sheet.html',
			controller: 'HeaderCtrl'
		});
	};
}]);

