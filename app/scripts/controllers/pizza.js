angular.module('pizza_comparer.controllers.pizza', ['pizza_comparer.factories.settings', 'pizza_comparer.factories.pizza'])

.controller('PizzaListController', function($scope, $ionicModal, Pizza, settingsService){
    $scope.settings = settingsService.loadSettings();

    $ionicModal.fromTemplateUrl('/views/pizza_details.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.pizzaModal = modal;   
    });

    $ionicModal.fromTemplateUrl('/views/settings.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.settingsModal = modal;   
    });

    $scope.pizzas = [
        new Pizza({ name: 'mała pizza', diameter: 30, price: 16.50 }),
        new Pizza({ name: 'średnia pizza', diameter: 42, price: 18.99 }),
        new Pizza({ name: 'duża pizza', diameter: 50, price: 21.20 })  
    ];

    $scope.addNewPizza = function(){
        $scope.pizza = {};
        $scope.pizzaModal.show();
    };

    $scope.editPizza = function(pizza){
        $scope.pizza = angular.copy(pizza);
        $scope.pizzaModal.show();
    };

    $scope.removePizza = function(pizza){
        var index = $scope.pizzas.indexOf(pizza);
        $scope.pizzas.splice(index,1); 
    };

    $scope.openSettings = function(){
        $scope.settingsModal.show();
    }
});