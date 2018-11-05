(function(){
	'use strict';

	angular.module('MyMenuApp', [])
			.controller('MyMenuController', MyMenuController)
			.service('GetMenuService', GetMenuService)
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

	MyMenuController.$inject = ['GetMenuService'];
	function MyMenuController(GetMenuService){
		var menu = this;

		menu.found = [];
		menu.nothing = true;
		menu.item = "";
		menu.items = "";

		// Add item to found list
		menu.listFound = function(){

			var promise = GetMenuService.getMenu();

			promise.then(function(response){

				menu.items = response.data;

				console.log(menu.items);
				// debugger;
				
				/*if(menu.item!=="\"\"" || menu.item!==''){
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
				}*/

			}).catch(function(error){
				console.log("Something went worng.");
			});

			/*if(menu.item!=="\"\"" || menu.item!==''){
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
			}*/
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
			var response = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			});

			return response;
		};
	}

})();