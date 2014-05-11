angular.module('pizza_comparer.factories.settings', [])

.service('settingsService', function(){
    this.saveSettings = function(settings){
        window.localStorage['pizza_comparer_settings'] = angular.toJson(settings);
    };
    this.loadSettings = function(){
        var settingsString = window.localStorage['pizza_comparer_settings'];
        if(settingsString){
            return angular.fromJson(settingsString);
        }
        return {
            currencyCode: 'PLN',
            unitCode: 'cm'
        };
    }
});