window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
    if (errorObject && /<omitted>/.test(errorMsg)) {
        console.error('Full exception message: ' + errorObject.message);
    }
}
/*
 * UUID-js: A js library to generate and parse UUIDs, TimeUUIDs and generate
 * TimeUUID based on dates for range selections.
 * @see http://www.ietf.org/rfc/rfc4122.txt
 **/

function UUIDjs() {
};

UUIDjs.maxFromBits = function(bits) {
  return Math.pow(2, bits);
};

UUIDjs.limitUI04 = UUIDjs.maxFromBits(4);
UUIDjs.limitUI06 = UUIDjs.maxFromBits(6);
UUIDjs.limitUI08 = UUIDjs.maxFromBits(8);
UUIDjs.limitUI12 = UUIDjs.maxFromBits(12);
UUIDjs.limitUI14 = UUIDjs.maxFromBits(14);
UUIDjs.limitUI16 = UUIDjs.maxFromBits(16);
UUIDjs.limitUI32 = UUIDjs.maxFromBits(32);
UUIDjs.limitUI40 = UUIDjs.maxFromBits(40);
UUIDjs.limitUI48 = UUIDjs.maxFromBits(48);

UUIDjs.randomUI04 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI04);
};
UUIDjs.randomUI06 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI06);
};
UUIDjs.randomUI08 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI08);
};
UUIDjs.randomUI12 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI12);
};
UUIDjs.randomUI14 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI14);
};
UUIDjs.randomUI16 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI16);
};
UUIDjs.randomUI32 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI32);
};
UUIDjs.randomUI40 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 40 - 30)) * (1 << 30);
};
UUIDjs.randomUI48 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 48 - 30)) * (1 << 30);
};

UUIDjs.paddedString = function(string, length, z) {
  string = String(string);
  z = (!z) ? '0' : z;
  var i = length - string.length;
  for (; i > 0; i >>>= 1, z += z) {
    if (i & 1) {
      string = z + string;
    }
  }
  return string;
};

UUIDjs.prototype.fromParts = function(timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, clockSeqLow, node) {
  this.version = (timeHiAndVersion >> 12) & 0xF;
  this.hex = UUIDjs.paddedString(timeLow.toString(16), 8)
             + '-'
             + UUIDjs.paddedString(timeMid.toString(16), 4)
             + '-'
             + UUIDjs.paddedString(timeHiAndVersion.toString(16), 4)
             + '-'
             + UUIDjs.paddedString(clockSeqHiAndReserved.toString(16), 2)
             + UUIDjs.paddedString(clockSeqLow.toString(16), 2)
             + '-'
             + UUIDjs.paddedString(node.toString(16), 12);
  return this;
};

UUIDjs.prototype.toString = function() {
  return this.hex;
};
UUIDjs.prototype.toURN = function() {
  return 'urn:uuid:' + this.hex;
};

UUIDjs.prototype.toBytes = function() {
  var parts = this.hex.split('-');
  var ints = [];
  var intPos = 0;
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts[i].length; j+=2) {
      ints[intPos++] = parseInt(parts[i].substr(j, 2), 16);
    }
  }
  return ints;
};

UUIDjs.prototype.equals = function(uuid) {
  if (!(uuid instanceof UUID)) {
    return false;
  }
  if (this.hex !== uuid.hex) {
    return false;
  }
  return true;
};

UUIDjs.getTimeFieldValues = function(time) {
  var ts = time - Date.UTC(1582, 9, 15);
  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
  return { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
            mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
};

UUIDjs._create4 = function() {
  return new UUIDjs().fromParts(
    UUIDjs.randomUI32(),
    UUIDjs.randomUI16(),
    0x4000 | UUIDjs.randomUI12(),
    0x80   | UUIDjs.randomUI06(),
    UUIDjs.randomUI08(),
    UUIDjs.randomUI48()
  );
};

UUIDjs._create1 = function() {
  var now = new Date().getTime();
  var sequence = UUIDjs.randomUI14();
  var node = (UUIDjs.randomUI08() | 1) * 0x10000000000 + UUIDjs.randomUI40();
  var tick = UUIDjs.randomUI04();
  var timestamp = 0;
  var timestampRatio = 1/4;

  if (now != timestamp) {
    if (now < timestamp) {
      sequence++;
    }
    timestamp = now;
    tick = UUIDjs.randomUI04();
  } else if (Math.random() < timestampRatio && tick < 9984) {
    tick += 1 + UUIDjs.randomUI04();
  } else {
    sequence++;
  }

  var tf = UUIDjs.getTimeFieldValues(timestamp);
  var tl = tf.low + tick;
  var thav = (tf.hi & 0xFFF) | 0x1000;

  sequence &= 0x3FFF;
  var cshar = (sequence >>> 8) | 0x80;
  var csl = sequence & 0xFF;

  return new UUIDjs().fromParts(tl, tf.mid, thav, cshar, csl, node);
};

UUIDjs.create = function(version) {
  version = version || 4;
  return this['_create' + version]();
};

UUIDjs.fromTime = function(time, last) {
  last = (!last) ? false : last;
  var tf = UUIDjs.getTimeFieldValues(time);
  var tl = tf.low;
  var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'
  if (last === false) {
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0, 0, 0);
  } else {
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0x80 | UUIDjs.limitUI06, UUIDjs.limitUI08 - 1, UUIDjs.limitUI48 - 1);
  }
};

UUIDjs.firstFromTime = function(time) {
  return UUIDjs.fromTime(time, false);
};
UUIDjs.lastFromTime = function(time) {
  return UUIDjs.fromTime(time, true);
};

UUIDjs.fromURN = function(strId) {
  var r, p = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i;
  if ((r = p.exec(strId))) {
    return new UUIDjs().fromParts(parseInt(r[1], 16), parseInt(r[2], 16),
                            parseInt(r[3], 16), parseInt(r[4], 16),
                            parseInt(r[5], 16), parseInt(r[6], 16));
  }
  return null;
};

UUIDjs.fromBytes = function(ints) {
  if (ints.length < 5) {
    return null;
  }
  var str = '';
  var pos = 0;
  var parts = [4, 2, 2, 2, 6];
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts[i]; j++) {
      var octet = ints[pos++].toString(16);
      if (octet.length == 1) {
        octet = '0' + octet;
      }
      str += octet;
    }
    if (parts[i] !== 6) {
      str += '-';
    }
  }
  return UUIDjs.fromURN(str);
};

UUIDjs.fromBinary = function(binary) {
  var ints = [];
  for (var i = 0; i < binary.length; i++) {
    ints[i] = binary.charCodeAt(i);
    if (ints[i] > 255 || ints[i] < 0) {
      throw new Error('Unexpected byte in binary data.');
    }
  }
  return UUIDjs.fromBytes(ints);
};

// Aliases to support legacy code. Do not use these when writing new code as
// they may be removed in future versions!
UUIDjs.new = function() {
  return this.create(4);
};
UUIDjs.newTS = function() {
  return this.create(1);
};
angular.module("pizza_comparer.factories.currencies", [])
    .service("currencies", function () {
        return [
            { code: "PLN", short:"zł", name: "złoty", precision: 2, step: "0.01" },
            { code: "GBP", short:"", name: "funt szterling", precision: 2, step: "0.01" },
            { code: "USD", short:"$", name: "dolar amerykański", precision: 2, step: "0.01" },
            { code: "EUR", short:"", name: "euro", precision: 2, step: "0.01" },
            { code: "CHF", short:"", name: "frank szwajcarski", precision: 2, step: "0.01" },
            { code: "CZK", short:"", name: "korona czeska", precision: 2, step: "0.01" },
            { code: "HRK", short:"", name: "kuna chorwacka", precision: 2, step: "0.01" },
            { code: "RON", short:"", name: "lej rumuński", precision: 2, step: "0.01" },
            { code: "BGN", short:"", name: "lew bułgarski", precision: 2, step: "0.01" },
            { code: "RUB", short:"", name: "rubel rosyjski", precision: 2, step: "0.01" },
        ];
    });
angular.module('pizza_comparer.factories.pizza', [])

.factory('Pizza', function(){
    return function(data){
        this.name = data.name;
        this.diameter = data.diameter;
        this.price = data.price;
        this.id = UUIDjs.create().toString();

        this.size = function(){
            return Math.PI * Math.pow(this.diameter/2.0,2); 
        };
        this.pricePerSize = function(){
            return Math.round(this.price / this.size() * 10000)/10000;
        };
    };
});
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
angular.module("pizza_comparer.factories.units", [])
    .service("units", function () {
        return [
            { code: "inch", name: "cal" },
            { code: "m", name: "metr" },
            { code: "cm", name: "centymetr" }
        ];
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
angular.module('pizza_comparer.controllers.pizza', ['pizza_comparer.factories.settings', 'pizza_comparer.factories.pizza'])

.controller('PizzaListController', function($scope, $ionicModal, Pizza, settingsService){
    $scope.settings = settingsService.loadSettings();

    $ionicModal.fromTemplateUrl('/views/pizza_details.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.pizzaModal = modal;   
    });

    $ionicModal.fromTemplateUrl('/views/settings.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.settingsModal = modal;   
    });

    $scope.pizzas = [
        new Pizza({ name: 'mała pizza', diameter: 30, price: 16.50 }),
        new Pizza({ name: 'średnia pizza', diameter: 42, price: 18.99 }),
        new Pizza({ name: 'duża pizza', diameter: 50, price: 21.20 })  
    ];

    $scope.addNewPizza = function(){
        $scope.pizza = {};
        $scope.pizzaModal.show();
    };

    $scope.editPizza = function(pizza){
        $scope.pizza = angular.copy(pizza);
        $scope.pizzaModal.show();
    };

    $scope.removePizza = function(pizza){
        var index = $scope.pizzas.indexOf(pizza);
        $scope.pizzas.splice(index,1); 
    };

    $scope.openSettings = function(){
        $scope.settingsModal.show();
    }
});
angular.module('pizza_comparer.controllers.pizza_details', [])

.controller('PizzaDetailsController', function($scope, $log, Pizza){
    $scope.savePizza = function(pizza){
        if(pizza.id){
            angular.forEach($scope.pizzas, function(p){
                if(p.id === pizza.id){
                    p.name = pizza.name;
                    p.diameter = pizza.diameter;
                    p.price = pizza.price;
                }
            })
        }
        else{
            $log.log('kupa');
            $scope.pizzas.push(new Pizza(pizza));
        }
        $scope.pizzaModal.hide();
        pizza.name = "";
        pizza.diameter = "";
        pizza.price = "";
    };

    $scope.closeModal = function(){
        $scope.pizzaModal.hide();
    };
});
angular.module('pizza_comparer.controllers.settings', ['pizza_comparer.factories.units', 'pizza_comparer.factories.currencies'])

.controller('SettingsController', function($scope, units, currencies){
    $scope.units = units;
    $scope.currencies = currencies;

    $scope.closeModal = function(){
        $scope.settingsModal.hide();
    }
});
angular.module('pizza_comparer', [
    'ionic',
    'pizza_comparer.controllers.settings',
    'pizza_comparer.controllers.pizza',
    'pizza_comparer.controllers.pizza_details',
    'pizza_comparer.directives',
    'pizza_comparer.factories.pizza',
    'pizza_comparer.factories.units',
    'pizza_comparer.factories.currencies',
    'pizza_comparer.factories.settings', 
]);