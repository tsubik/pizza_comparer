angular.module('pizza_comparer.factories.pizza', [])

.factory('Pizza', function(){
    return function(data){
        this.name = data.name;
        this.diameter = data.diameter;
        this.price = data.price;
        this.id = UUIDjs.create().toString();

        this.size = function(){
            return Math.PI * Math.pow(this.diameter/2.0,2); 
        };
        this.pricePerSize = function(){
            return Math.round(this.price / this.size() * 10000)/10000;
        };
    }
});