angular.module('kidsFood')
.controller("HeaderCtrl", ['$mdBottomSheet', function($mdBottomSheet){

	$scope.showMobileMenu = function() {
		$mdBottomSheet.show({
			templateUrl: './templates/partials/bottom-sheet.html',
			controller: 'HeaderCtrl'
		});
	};
}]);

