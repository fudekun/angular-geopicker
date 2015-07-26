'use strict';

describe('Filter: geoFormatter', function() {

  // load the filter's module
  beforeEach(module('angularGeopickerApp'));

  // initialize a new instance of the filter before each test
  var geoFormatter;
  beforeEach(inject(function($filter) {
    geoFormatter = $filter('geoFormatter');
  }));

  it('non exist map.markers.clickedMarker', function() {
    expect(geoFormatter()).toBe("");
  });


  it('error marker', function() {
    expect(geoFormatter("dummy")).toBe('');
  });

  it('non option', function() {
    var marker = {
      lat: "36.3244",
      lng: "139.2443"
    };
    expect(geoFormatter(marker)).toBe('36.324400,139.244300');
  });

  it('non option', function() {
    var marker = {
      lat: "36.3244",
      lng: "139.2443"
    };
    expect(geoFormatter(marker)).toBe('36.324400,139.244300');
  });

  it('opt precision', function() {
    var marker = {
      lat: "36.3244",
      lng: "139.2443"
    };
    expect(geoFormatter(marker, 3)).toBe('36.324,139.244');
  });

  it('opt sep', function() {
    var marker = {
      lat: "36.3244",
      lng: "139.2443"
    };
    expect(geoFormatter(marker, undefined, "|")).toBe('36.324400|139.244300');
  });

  it('opt rad', function() {
    var marker = {
      lat: "36.3244",
      lng: "139.2443"
    };
    expect(geoFormatter(marker, undefined, undefined, "true")).toBe("36°19'27.839\"N,139°14'39.48\"E");
  });

  it('opt all', function() {
    var marker = {
      lat: "36.3244",
      lng: "139.2443"
    };
    expect(geoFormatter(marker, 2, "|", "true")).toBe("36°19'12\"N|139°14'24\"E");
  });

});
