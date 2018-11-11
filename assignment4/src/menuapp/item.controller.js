(function () {
'use strict';

angular.module('data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['menuItems'];
function ItemsController(menuItems) {
  var itemCtrl = this;
  
  itemCtrl.list = menuItems.menu_items;
    itemCtrl.name = menuItems.category.name;
    console.log("menuItems" ,menuItems)
    console.log("itemCtrl.name" ,itemCtrl.name)
  //itemDetail.items = item.menu_items;
}

})();