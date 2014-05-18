angular.module('pizza_comparer.factories.restaurants',[])
.factory('Restaurants', function(Pizza){
    var Restaurants = {
        new: function(name){
            return {
                name: name,
                pizzas: []
            };
        },
        save: function(restaurants){
            window.localStorage['pizza_comparer_restaurants'] = angular.toJson(restaurants);
        },
        all: function(){
            var _restaurants = [];
            try{
                _restaurants = angular.fromJson(window.localStorage['pizza_comparer_restaurants']);   
            }catch(e){
            }; 
            var defaultRestaurant = { 
                name: 'Sample ristorante', 
                pizzas: [
                    new Pizza({ name: 'mała pizza', diameter: 30, price: 16.50 }),
                    new Pizza({ name: 'średnia pizza', diameter: 42, price: 18.99 }),
                    new Pizza({ name: 'duża pizza', diameter: 50, price: 21.20 })  
                ]};
            if(!_restaurants) _restaurants = [];            
            if(_restaurants.length === 0){
                _restaurants.push(defaultRestaurant);
            }
            return _restaurants;
        },
        getLastActiveIndex: function(){
            return parseInt(window.localStorage['pizza_comparer_restaurants_lastActiveIndex']) || 0;
        },
        setLastActiveIndex: function(index){
            window.localStorage['pizza_comparer_restaurants_lastActiveIndex'] = index; 
        }
    };
    return Restaurants;
});