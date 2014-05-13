angular.module('pizza_comparer.controllers.settings', ['pizza_comparer.factories.units','pizza_comparer.factories.currencies'])

.controller('SettingsController', function($scope, $log, settingsService, units, currencies){
    $scope.units = units;
    $scope.currencies = currencies;

    $scope.currencyCode = settingsService.settings.currency.code;
    $scope.unitCode = settingsService.settings.unit.code;

    $scope.closeModal = function(){
        $scope.settingsModal.hide();
    };

    $scope.$watch('currencyCode', function(v){
        $log.log('watch currencyCode: '+v);
        if(v){
            var currency = currencies.filter(function(x) { return x.code === $scope.currencyCode; })[0];
            settingsService.settings.currency = currency;
            settingsService.saveSettings(settingsService.settings);           
        }
    });
    $scope.$watch('unitCode', function(v){
        if(v){
            var unit = units.filter(function(x) { return x.code === $scope.unitCode; })[0];
            settingsService.settings.unit.code = unit.code;
            settingsService.saveSettings(settingsService.settings);           
        }
    });
     
});