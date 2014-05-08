angular.module('pizza_comparer', ['ionic'])

.controller('PizzaController', function($scope){
    $scope.pizzas = [
        { name: 'mała pizza', size: 30, price: 16.50 },
        { name: 'średnia pizza', size: 42, price: 18.99 },
        { name: 'duża pizza', size: 50, price: 21.20 }  
    ];
});