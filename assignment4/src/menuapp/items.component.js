(function () {
    'use strict';
    
    angular.module('data')
    .component('menuList', {
      templateUrl: 'src/menuapp/templates/itemlist.template.html',
      bindings: {
        items: '<',
          name:'<'
        
      }
    });  
    
})();