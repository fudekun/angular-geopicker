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
