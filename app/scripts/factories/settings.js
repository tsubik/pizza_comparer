angular.module('pizza_comparer.factories.settings', [])

.factory('Settings', function($log,units, currencies){
    var _settingsCodes = {};
    try
    {
       _settingsCodes = angular.fromJson(window.localStorage['pizza_comparer_settings']);
    }
    catch(e){
    }
    var defaultSettingsCodes = {
        currencyCode: 'PLN',
        unitCode: 'cm'
    };

    _settingsCodes = angular.extend({}, defaultSettingsCodes, _settingsCodes);
    _settings = {};

    var obj = {
        get: function(){
            return _settings;
        },
        getCodes: function(){
            return _settingsCodes;
        },
        save: function(){
            _settings.currency = currencies.filter(function(x){ return x.code === _settingsCodes.currencyCode; })[0];
            _settings.unit = units.filter(function(x){ return x.code === _settingsCodes.unitCode; })[0];
            window.localStorage['pizza_comparer_settings'] = angular.toJson(_settingsCodes);
        }
    };

    obj.save();
    return obj;
});