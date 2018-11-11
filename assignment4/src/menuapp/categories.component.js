(function () {
    'use strict';
    
    angular.module('data')
    .component('categoryList', {
      templateUrl: 'src/menuapp/templates/category-list.template.html',
      bindings: {
        category: '<'
      }
    });
    
    
})();