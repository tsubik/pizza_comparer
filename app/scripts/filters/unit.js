angular.module('pizza_comparer.filters.unit', [])
.filter('unit', function(Settings){
    return function(input){
        return input + " " + Settings.get().unit.code;     
    };
});