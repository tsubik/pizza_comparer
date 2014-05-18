angular.module('pizza_comparer.filters.currency',[])
.filter('currency', function(Settings){
    return function(input){
        return input + " " + Settings.get().currency.short;     
    };
});