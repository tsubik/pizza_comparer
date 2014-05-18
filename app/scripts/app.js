angular.module('pizza_comparer', [
    'ionic',
    'pizza_comparer.controllers.settings',
    'pizza_comparer.controllers.pizza',
    'pizza_comparer.controllers.pizza_details',
    'pizza_comparer.directives',
    'pizza_comparer.factories.pizza',
    'pizza_comparer.factories.units',
    'pizza_comparer.factories.restaurants',
    'pizza_comparer.factories.currencies',
    'pizza_comparer.factories.settings', 
    'pizza_comparer.filters.currency',
    'pizza_comparer.filters.unit',
    'pizza_comparer.filters.pricePerSize'      
])
.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});