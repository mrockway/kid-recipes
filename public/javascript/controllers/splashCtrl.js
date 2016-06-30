angular.module('kidsFood')
.controller("SplashCtrl", ['$scope', function($scope){

	$scope.cardInfo = [{title: 'Create', content: 'Create and store your recipes online and bring them with you everywhere you go.'},
									 {title: 'Discover', content:'Get ideas from other members to try out with your own family'},
									 {title: 'Share', content: 'Share your recipes with other members or keep them all to yourself.'}
									];
									}]	
);