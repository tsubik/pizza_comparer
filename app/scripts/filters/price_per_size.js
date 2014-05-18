angular.module('pizza_comparer.filters.pricePerSize', [])
.filter('pricePerSize', function(Settings){
    return function(input){
        return input + " " + Settings.get().currency.symbol + "/" + Settings.get().unit.code +"2" ;     
    };
});