(function(angular) {
  'use strict';
  angular
    .module('angularGeopickerApp', [
      'ui.bootstrap',
      'leaflet-directive'
    ]);
}(angular));

(function(angular) {
  'use strict';
  var gpModule = angular.module('angularGeopickerApp');

  gpModule.controller('geopickerCtrl', ['$scope', function($scope) {
    $scope.map = {};
    angular.extend($scope.map, {
      markers: {},
      events: {
        map: {
          enable: ['click'],
          logic: 'emit'
        },
        markers: {
          enable: ['dragend'],
          logic: 'emit'
        }
      }
    });
    $scope.$on('leafletDirectiveMap.click', function(event, args) {
      $scope.map.markers.clickedMarker = {
        lat: args.leafletEvent.latlng.lat,
        lng: args.leafletEvent.latlng.lng,
        draggable: true
      };
    });
    $scope.$on('leafletDirectiveMarker.dragend', function(event, args) {
      $scope.map.markers.clickedMarker = args.model;
    });
  }]);

  gpModule.directive('angularGeopicker', ['geopickerConfig', 'geopickerFactory', function(geopickerConfig, geopickerFactory) {
    return {
      template: '<input popover-template="template" popover-placement="bottom" value={{map.markers.clickedMarker|geoFormatter:precision:sep:rad}}></input>',
      restrict: 'A',
      scope: true,
      replace: true,
      link: function(scope, element, attrs) {
        var getOrgCenter = function(attrs) {
          var centerObj = coordsBuilder(geopickerConfig.default.clat, geopickerConfig.default.clng);
          if (validateClatlng(attrs)) {
            centerObj = coordsBuilder(attrs.clat, attrs.clng);
          }
          centerObj.zoom = geopickerConfig.default.zoom;
          return centerObj;
        };
        var validateClatlng =  function(attrs) {
          if ('clat' in attrs && 'clng' in attrs) {
            if (geopickerFactory.isNumber(attrs.clat) && geopickerFactory.isNumber(attrs.clng)) {
              if (Number(attrs.clat) > -90 && Number(attrs.clat) < 90 && Number(attrs.clng) > -180 && Number(attrs.clng) < 180) {
                return true;
              }
            }
          }
          return false;
        };
        var coordsBuilder = function(lat, lng) {
          return {
            "lat": Number(lat),
            "lng": Number(lng)
          };
        };
        // Link
        scope.template = geopickerConfig.template;
        scope.map.center = getOrgCenter(attrs);
        scope.precision = geopickerFactory.isNumber(attrs.precision) === true ? attrs.precision : geopickerConfig.default.precision;
        scope.sep = attrs.sep || geopickerConfig.default.sep;
        scope.rad = (Boolean(attrs.rad) && attrs.rad === "true") ? true : geopickerConfig.default.rad;
      },
      controller: 'geopickerCtrl'
    };
  }]);
}(angular));

(function(angular) {
  'use strict';
  var gpModule = angular.module('angularGeopickerApp');

  gpModule.factory('geopickerFactory', [function() {
    var retVal = {
      degToRadLat: function(lat) {
        return retVal._shapingDohunWithNS(lat);
      },
      degToRadLng: function(lng) {
        return retVal._shapingDohunWithWE(lng);
      },
      roundP: function(val, precision) {
        var digit = Math.pow(10, precision);
        val = val * digit;
        val = Math.round(val);
        val = val / digit;
        return val;
      },
      isNumber: function(value) {
        value = Number(value);
        return value === value && Object.prototype.toString.call(value) === '[object Number]';
      },
      _shapingDohunWithWE: function(coord) {
        coord = Number(coord);
        var direction = coord > 0 ? "E" : "W";
        return retVal._shapingDohun(coord) + direction;
      },
      _shapingDohunWithNS: function(coord) {
        coord = Number(coord);
        var direction = coord > 0 ? "N" : "S";
        return retVal._shapingDohun(coord) + direction;
      },
      _shapingDohun: function(coord) {
        coord = Math.abs(Number(coord));
        var d = parseInt(coord);
        var h = parseInt((coord - d) * 60);
        var b = parseInt((((coord - d) * 60) - h) * 60 * 1000) / 1000;
        return d + "°" + h + "'" + b + "\"";
      }
    };
    return retVal;
  }]);
}(angular));

(function(angular) {
  'use strict';
  var gpModule = angular.module('angularGeopickerApp');


  gpModule.filter('geoFormatter', ['geopickerFactory', function(geopickerFactory) {
    var isOk = function(clickedMarker) {
      if (typeof clickedMarker === "object") {
        if ("lat" in clickedMarker && "lng" in clickedMarker) {
          if (geopickerFactory.isNumber(clickedMarker.lat) && geopickerFactory.isNumber(clickedMarker.lng)) {
            if (Number(clickedMarker.lat) > -90 && Number(clickedMarker.lat) < 90 && Number(clickedMarker.lng) > -180 && Number(clickedMarker.lng) < 180) {
              return true;
            }
          }
        }
      }
      return false;
    };

    return function(clickedMarker, precision, sep, rad) {
      precision = geopickerFactory.isNumber(precision) === true ? precision : 6;
      sep = sep || ",";
      rad = (Boolean(rad) || rad === "true") ? true : false;
      var retVal = "";
      if (isOk(clickedMarker)) {
        var rLat = geopickerFactory.roundP(clickedMarker.lat, precision).toFixed(precision);
        var rLng = geopickerFactory.roundP(clickedMarker.lng, precision).toFixed(precision);
        if (rad) {
          rLat = geopickerFactory.degToRadLat(rLat);
          rLng = geopickerFactory.degToRadLng(rLng);
        }
        retVal = rLat + sep + rLng;
      }
      return retVal;
    };
  }]);

}(angular));

(function(angular) {
  'use strict';
  var gpModule = angular.module('angularGeopickerApp');

  gpModule.constant('geopickerConfig', {
    template: 'views/angular-geopicker.tmpl.html',
    default: {
      clat: 35.689487, // Tokyo,Japan
      clng: 139.691706, // Tokyo,Japan
      zoom: 10,
      precision: 6,
      sep: ",",
      rad: false
    }
  });

}(angular));

angular.module('angularGeopickerApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/angular-geopicker.tmpl.html',
    "<leaflet id=\"angular-geopicker-directive-only\" center=\"map.center\" markers=\"map.markers\" event-broadcast=\"map.events\" height=\"250px\" width=\"250px\"></leaflet>"
  );

}]);
