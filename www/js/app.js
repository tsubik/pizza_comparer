angular.module('pizza_comparer', ['ionic'])

.controller('PizzaController', function($scope, $ionicModal){

    $ionicModal.fromTemplateUrl('pizza-modal.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.pizzaModal = modal;
    });

    $scope.pizzas = [
        { name: 'mała pizza', size: 30, price: 16.50 },
        { name: 'średnia pizza', size: 42, price: 18.99 },
        { name: 'duża pizza', size: 50, price: 21.20 }  
    ];

    $scope.newPizza = function(){
        $scope.pizzaModal.show();
    };

    $scope.createPizza = function(pizza){
        $scope.pizzas.push({
            name: pizza.name,
            size: pizza.size,
            price: pizza.price
        });
        $scope.pizzaModal.hide();
        pizza.name = "";
        pizza.size = "";
        pizza.price = "";
    };

    $scope.closeNewPizza = function(){
        $scope.pizzaModal.hide();
    };
});