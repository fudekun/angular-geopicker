'use strict';

describe('Service: geopickerFactory', function () {

  // load the service's module
  beforeEach(module('angularGeopickerApp'));

  // instantiate service
  var geopickerFactory;
  beforeEach(inject(function (_geopickerFactory_) {
    geopickerFactory = _geopickerFactory_;
  }));

  it('should do something', function () {
    expect(!!geopickerFactory).toBe(true);
  });

  it('isNumber test', function () {
    expect(!!geopickerFactory.isNumber(12)).toBe(true);
    expect(!!geopickerFactory.isNumber("12")).toBe(true);
    expect(!!geopickerFactory.isNumber("test")).toBe(false);
    expect(!!geopickerFactory.isNumber(undefined)).toBe(false);
    expect(!!geopickerFactory.isNumber(NaN)).toBe(false);
  });

  it('degToRadLat test', function () {
    expect(geopickerFactory.degToRadLat(38.0)).toBe("38°0'0\"N");
    expect(geopickerFactory.degToRadLat(-38)).toBe("38°0'0\"S");
  });

  it('degToRadLat test', function () {
    expect(geopickerFactory.degToRadLng(138.0)).toBe("138°0'0\"E");
    expect(geopickerFactory.degToRadLng(-138)).toBe("138°0'0\"W");
  });

  it('roudP test', function () {
    expect(geopickerFactory.roundP(138.85784929875429859829, 10)).toBe(138.8578492988);
  });

});
