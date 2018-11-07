(function(){
	'use strict';

	angular.module('MyMenuApp', [])
			.controller('MyMenuController', MyMenuController)
			.service('GetMenuService', GetMenuService)
			.directive('foundItems', FoundItems)
			.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


	function FoundItems(){
		var ddo = {
			templateUrl: 'foundItems.html',
			restrict: 'E',
			scope: {
				found: '<',
				onRemove: '&',
				nothing: '<'
			},
			controller: MyMenuController,
			controllerAs: 'dish',
			bindToController: true
		}
		return ddo;
	};

	MyMenuController.$inject = ['GetMenuService'];
	function MyMenuController(GetMenuService){
		var menu = this;

		menu.found = [];
		menu.nothing = false;
		menu.searchString = "";
		menu.items = "";

		// Add item to found list
		menu.listFound = function(){

			menu.nothing = false;
			
			if( menu.searchString==='' || menu.searchString===undefined ){
				menu.nothing = true;
			}else{
				
				var promise = GetMenuService.getMenu(menu.searchString);
				
				promise.then(function(response){
					menu.found = response;
					console.log(menu.found);
					if(menu.found.length==0){
						menu.nothing = true;
					}
				}).catch(function(){
					console.log("ERROR OCCURED")
				});
			}
		};

		// remove item from found array
		menu.removeItem = function(index){
			menu.found.splice(index, 1);
		}

	}

	// Service to fetch the list of menu items
	GetMenuService.$inject = ['$http', 'ApiBasePath']
	function GetMenuService($http, ApiBasePath){
		var service = this

		service.getMenu = function(str){

			service.response = null;
			service.found = [];

			var myresponse = $http({
				method: 'GET',
				url: (ApiBasePath + "/menu_items.json")
			}).then(function(response){
				service.response = response.data['menu_items'];

				for(var temp in service.response){
					var x = service.response[temp].description;
					if(x.includes(str)){
						var ele = {
							sName: service.response[temp].short_name,
							des: service.response[temp].description
						}
						service.found.push(ele);
					}
				}
				
				return service.found;

			}, function(error){
				console.log(response.status);
			});

			return myresponse;
		}
	}

})();