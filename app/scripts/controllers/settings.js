angular.module('pizza_comparer.controllers.settings', ['pizza_comparer.factories.units', 'pizza_comparer.factories.currencies'])

.controller('SettingsController', function($scope, units, currencies){
    $scope.units = units;
    $scope.currencies = currencies;

    $scope.closeModal = function(){
        $scope.settingsModal.hide();
    }
});