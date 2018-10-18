(function(){
	'use strict';

	angular.module('LunchChecker', [])
		.controller('LunchController', LunchController);

		LunchController.$inject = ['$scope'];
		function LunchController($scope, $filter){
			$scope.menu = "";
			$scope.count = 0;
			$scope.checkMenu = function(){
					
				for(var i=0; i<$scope.menu.length; i++){
					if($scope.menu[i]==="\"\""){
						$scope.menu.splice(i,1);
					}
				}

				if($scope.menu.length<=3 && $scope.menu.length !== 0){
					$scope.test = "Enjoy!";
				}
				else if($scope.menu.length === 0){
					$scope.test = "Please enter data first";
				}
				else{
					$scope.test = "Too much!";
				}
			};		
		};
})();