angular.module('pizza_comparer.factories.pizza', [])

.factory('Pizza', function(){
    return function(data){
        this.name = data.name;
        this.diameter = data.diameter;
        this.price = data.price;

        this.size = function(){
            return Math.PI * Math.pow(this.diameter/2.0,2); 
        };
        this.pricePerSize = function(){
            return Math.round(this.price / this.size() * 10000)/10000;
        };
    }
});
angular.module('pizza_comparer.directives', ['ionic'])
  .directive('onValidSubmit', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      require: '^form',
      restrict: 'A',
      link: function(scope, element, attrs, form) {
        form.$submitted = false;
        var fn = $parse(attrs.onValidSubmit);
        element.on('submit', function(event) {
          scope.$apply(function() {
            element.addClass('ng-submitted');
            form.$submitted = true;
            if (form.$valid) {
              if (typeof fn === 'function') {
                fn(scope, {$event: event});
              }
            }
          });
        });
      }
    }
 
  }])
  .directive('validated', ['$parse', function($parse) {
    return {
      restrict: 'AEC',
      require: '^form',
      link: function(scope, element, attrs, form) {
        var inputs = element.find("*");
        for(var i = 0; i < inputs.length; i++) {
          (function(input){
            var attributes = input.attributes;
            if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
              var field = form[attributes.name.value];
              if (field != void 0) {
                scope.$watch(function() {
                  return form.$submitted + "_" + field.$valid;
                }, function() {
                  if (form.$submitted != true) return;
                  var inp = angular.element(input);
                  if (inp.hasClass('ng-invalid')) {
                    element.removeClass('has-success');
                    element.addClass('has-error');
                  } else {
                    element.removeClass('has-error').addClass('has-success');
                  }
                });
              }
            }
          })(inputs[i]);
        }
      }
    }
  }])
;
angular.module('pizza_comparer.controllers.pizza', [])

.controller('PizzaController', function($scope, $ionicModal, Pizza){
    $ionicModal.fromTemplateUrl('pizza-modal.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.pizzaModal = modal;
    });

    $scope.pizzas = [
        new Pizza({ name: 'mała pizza', diameter: 30, price: 16.50 }),
        new Pizza({ name: 'średnia pizza', diameter: 42, price: 18.99 }),
        new Pizza({ name: 'duża pizza', diameter: 50, price: 21.20 })  
    ];

    $scope.newPizza = function(){
        $scope.pizzaModal.show();
    };

    $scope.createPizza = function(pizza){
        $scope.pizzas.push(new Pizza(pizza));
        $scope.pizzaModal.hide();
        pizza.name = "";
        pizza.diameter = "";
        pizza.price = "";
    };

    $scope.removePizza = function(pizza){
        var index = $scope.pizzas.indexOf(pizza);
        $scope.pizzas.splice(index,1); 
    };

    $scope.closeNewPizza = function(){
        $scope.pizzaModal.hide();
    };
});
angular.module('pizza_comparer', [
    'ionic',
    'pizza_comparer.controllers.pizza',
    'pizza_comparer.directives',
    'pizza_comparer.factories.pizza'
]);

window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
    if (errorObject && /<omitted>/.test(errorMsg)) {
        console.error('Full exception message: ' + errorObject.message);
    }
}