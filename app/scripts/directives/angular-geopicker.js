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
