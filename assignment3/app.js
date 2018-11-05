(function(){
	'use strict';

	angular.module('MyMenuApp', [])
			.controller('MyMenuController', MyMenuController)
			.factory('MenuFactory', MenuFactory)
			.component('foundItems', FoundItems)
			.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


	function FoundItems(){
		var ddo = {
			templateUrl: 'foundItems.html',
			restrict: 'E',
			scope: {
				found: '<',
				onRemove: '&'
			},
			controller: MyMenuController,
			controllerAs: 'dish',
			bindToController: true
		}
		return ddo;
	};

	MyMenuController.$inject = ['MenuFactory'];
	function MyMenuController(MenuFactory){
		var menu = this;

		// Using factory to create new Menu list service
		var menuList = MenuFactory();

		menu.found = [];
		menu.nothing = true;
		menu.item = "";

		// Add item to found list
		menu.listFound = function(){
			menu.items = menuList.getMenu();
			if(menu.item!=="\"\"" || menu.item!==''){
				for(var i=0; i<menu.items.length; i++){
					var temp = menu.items[i].description;
					if(temp.includes(menu.item)){
						// push the items into the found array
						menu.nothing = false;
						var tt = {
							short_name: menu.items[i].short_name,
							description: menu.items[i].description
						}
						found.push(tt);
					}
				}
			}
		};

		// remove item from found array
		menu.removeItem = function(index){
			found.splice(index, 1);
		}

	}

	// Service to fetch the list of menu items
	GetMenuService.$inject = ['$http', 'ApiBasePath']
	function GetMenuService($http, ApiBasePath){
		var service = this

		service.getMenu = function(){
			var responce = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			}).then(
			function(response){
				return response;
			});

			return responce;
		};
	}

	// Factory to get the service
	function MenuFactory(){
		var factory = function($http, ApiBasePath){
			return new GetMenuService($http, ApiBasePath);
		}

		return factory;
	}

})();