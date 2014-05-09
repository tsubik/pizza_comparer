
angular.module('pizza_comparer', ['ionic'])

.factory('Pizza', function(){
    return function(data){
        this.name = data.name;
        this.diameter = data.diameter;
        this.price = data.price;

        this.size = function(){
            return Math.PI * Math.pow(this.diameter/2.0,2); 
        };
        this.pricePerSize = function(){
            return Math.round(this.price / this.size() * 10000)/10000;
        };
    }
})
.controller('PizzaController', function($scope, $ionicModal, Pizza){

    $ionicModal.fromTemplateUrl('pizza-modal.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.pizzaModal = modal;
    });

    $scope.pizzas = [
        new Pizza({ name: 'mała pizza', diameter: 30, price: 16.50 }),
        new Pizza({ name: 'średnia pizza', diameter: 42, price: 18.99 }),
        new Pizza({ name: 'duża pizza', diameter: 50, price: 21.20 })  
    ];

    $scope.newPizza = function(){
        $scope.pizzaModal.show();
    };

    $scope.createPizza = function(pizza){
        $scope.pizzas.push(new Pizza(pizza));
        $scope.pizzaModal.hide();
        pizza.name = "";
        pizza.diameter = "";
        pizza.price = "";
    };

    $scope.removePizza = function(pizza){
        var index = $scope.pizzas.indexOf(pizza);
        $scope.pizzas.splice(index,1); 
    };

    $scope.closeNewPizza = function(){
        $scope.pizzaModal.hide();
    };
});