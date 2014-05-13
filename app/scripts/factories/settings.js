angular.module('pizza_comparer.factories.settings', [])

.factory('Settings', function(units, currencies){
    var _settings = {};
    try
    {
       _settings = angular.fromJson(window.localStorage['pizza_comparer_settings']);
    }
    catch(e){
    }
    // var defaultSettings = {
    //     currency: currencies.filter(function(x){ return x.code === "PLN"; })[0],
    //     unit: units.filter(function(x){ return x.code === "cm";})[0]
    // };
    var defaultSettings = {
        currencyCode: 'PLN',
        unitCode: 'cm'
    };

    _settings = angular.extend({}, defaultSettings, _settings);

    var obj = {
        get: function(){
            return _settings;
        },
        save: function(){
            window.localStorage['pizza_comparer_settings'] = angular.toJson(_settings);
        }
    };

    obj.save();
    return obj;
});