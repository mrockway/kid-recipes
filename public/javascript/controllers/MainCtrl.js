angular.module('kidsFood')
.controller("MainCtrl", ['$scope', '$http', '$mdBottomSheet', function($scope, $http, $mdBottomSheet){

	$scope.showMobileMenu = function() {
		$mdBottomSheet.show({
			templateUrl: './templates/partials/bottom-sheet.html',
			controller: 'MainCtrl'
		});
	};

	$scope.cardInfo = [{title: 'Create', content: 'Create and store your recipes online and bring them with you everywhere you go.'},
										 {title: 'Discover', content:'Get ideas from other members to try out with your own family'},
										 {title: 'Share', content: 'Share your recipes with other members or keep them all to yourself.'}
										];

}]);

