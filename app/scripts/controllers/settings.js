angular.module('pizza_comparer.controllers.settings', [])

.controller('SettingsController', function($scope, $log, Settings, units, currencies){
    $scope.units = units;
    $scope.currencies = currencies;

    $scope.settings = Settings.get();

    $log.log('settings: ',$scope.settings);
        

    $scope.closeModal = function(){
        $scope.settingsModal.hide();
    };

    $scope.$watch('settings', function(v){
        $log.log('watch settings: ',v);
        if(v){
            Settings.save();                
        }
    });
     
});