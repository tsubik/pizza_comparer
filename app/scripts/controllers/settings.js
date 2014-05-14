angular.module('pizza_comparer.controllers.settings', [])

.controller('SettingsController', function($scope, $log, Settings, units, currencies){
    $scope.units = units;
    $scope.currencies = currencies;

    $scope.settings = Settings.getCodes();

    $scope.closeModal = function(){
        $scope.settingsModal.hide();
    };

    $scope.$watch('settings', function(v){
        if(v){
            Settings.save();           
        }
    }, true);
     
});