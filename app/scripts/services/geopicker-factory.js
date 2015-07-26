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
