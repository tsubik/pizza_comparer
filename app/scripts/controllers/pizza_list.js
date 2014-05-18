angular.module('pizza_comparer.controllers.pizza', [])

.controller('PizzaListController', function($scope, $ionicModal,$ionicSideMenuDelegate, Pizza, Restaurants, Settings, currencies){
    $scope.settings = Settings.get();
    
    $ionicModal.fromTemplateUrl('views/pizza_details.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.pizzaModal = modal;   
    });

    $scope.restaurants = Restaurants.all();
    $scope.activeRestaurant = $scope.restaurants[Restaurants.getLastActiveIndex()];

    $scope.newRestaurant = function(){
        var restaurantName = prompt('Nazwa restauracji');
        if(restaurantName){
            var newRestaurant = Restaurants.new(restaurantName);
            $scope.restaurants.push(newRestaurant);
            Restaurants.save($scope.restaurants);
            $scope.selectRestaurant(newRestaurant, $scope.restaurants.length - 1);    
        }
    };

    $scope.toggleRestaurants = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.selectRestaurant = function(restuarant, index){
        $scope.activeRestaurant = restuarant;
        Restaurants.setLastActiveIndex(index);
        $ionicSideMenuDelegate.toggleLeft(false);
    }

    $scope.addNewPizza = function(){
        $scope.pizza = {};
        $scope.pizzaModal.show();
    };

    $scope.editPizza = function(pizza){
        $scope.pizza = angular.copy(pizza);
        $scope.pizzaModal.show();
    };

    $scope.removePizza = function(pizza){
        var index = $scope.activeRestaurant.pizzas.indexOf(pizza);
        $scope.activeRestaurant.pizzas.splice(index,1); 
    };

    $scope.openSettings = function(){
        if(!$scope.settingsModal){
            $ionicModal.fromTemplateUrl('views/settings.html',{
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal){
                $scope.settingsModal = modal;   
                $scope.settingsModal.show();        
            });        
        }
        else{
            $scope.settingsModal.show();
        }
    }
});