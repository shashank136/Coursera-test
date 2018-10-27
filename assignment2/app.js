(function(){
	'use strict';

	angular.module('Myapp', [])
		.controller('buyListController', buyListController)
		.controller('boughtListController', boughtListController)
		.service('groceryListService',groceryListService);

	buyListController.$inject = ['groceryListService'];

	function buyListController(groceryListService){
		var list = this;

		list.items = groceryListService.getItems();

		list.removeItem = function(index){
			groceryListService.removeItem(index);
		};
	}

	boughtListController.$inject = ['groceryListService'];

	function boughtListController(groceryListService){
		var list = this;

		list.items = groceryListService.getBoughtList();
	}

	function groceryListService(){
		var service = this;
		var items = [
			{ name: "cat food", quantity: 10	},
			{ name: "dog food", quantity: 12	},
			{ name: "fish food", quantity: 5	},
			{ name: "human food", quantity: 4 	},
			{ name: "Cow food", quantity: 14 	}
		];

		var boughtList = [];

		service.getBoughtList = function(){
			return boughtList;
		}

		service.getItems = function(){
			return items;
		};

		service.removeItem = function(index){
			boughtList.push(items[index]);
			items.splice(index, 1);
		};
	}

})();