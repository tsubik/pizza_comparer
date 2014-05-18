angular.module('pizza_comparer.controllers.pizza_details', [])

.controller('PizzaDetailsController', function($scope, $log, Pizza){
    $scope.savePizza = function(pizza){
        if(pizza.id){
            var p = $scope.activeRestaurant.pizzas.filter(function(p) { return p.id === pizza.id });
            p.name = pizza.name;
            p.diameter = pizza.diameter;
            p.price = pizza.price;
        }
        else{
            $scope.activeRestaurant.pizzas.push(new Pizza(pizza));
        }
        $scope.pizzaModal.hide();
        pizza.name = "";
        pizza.diameter = "";
        pizza.price = "";
    };

    $scope.closeModal = function(){
        $scope.pizzaModal.hide();
    };
});