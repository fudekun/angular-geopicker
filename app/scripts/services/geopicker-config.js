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
