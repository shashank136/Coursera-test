(function () {
    'use strict';
    
    angular.module('data')
    .controller('CategoriesController', CategoriesController);
    
    CategoriesController.$inject = ['categories'];  //categories come from state resolve
    function CategoriesController(categories) {
      var categoryCtrl = this;
      categoryCtrl.categoryname = categories;
    }
    
})();