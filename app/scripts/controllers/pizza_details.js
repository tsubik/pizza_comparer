angular.module('pizza_comparer.controllers.pizza_details', [])

.controller('PizzaDetailsController', function($scope, $log, Pizza){
    $scope.savePizza = function(pizza){
        if(pizza.id){
            angular.forEach($scope.pizzas, function(p){
                if(p.id === pizza.id){
                    p.name = pizza.name;
                    p.diameter = pizza.diameter;
                    p.price = pizza.price;
                }
            })
        }
        else{
            $scope.pizzas.push(new Pizza(pizza));
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