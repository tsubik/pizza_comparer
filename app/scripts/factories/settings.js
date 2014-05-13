angular.module('pizza_comparer.factories.settings', ['pizza_comparer.factories.units', 'pizza_comparer.factories.currencies'])

.service('settingsService', function(units, currencies){
    this.settings = null;

    this.saveSettings = function(settings){
        window.localStorage['pizza_comparer_settings'] = angular.toJson(settings);
    };
    this.loadSettings = function(){
        var settingsString = window.localStorage['pizza_comparer_settings'];
        if(settingsString){
            return angular.fromJson(settingsString);
        }
        return {
            currency: currencies.filter(function(x){ return x.code === "PLN"; })[0],
            unit: units.filter(function(x){ return x.code === "cm";})[0]
        };
    };
    
});