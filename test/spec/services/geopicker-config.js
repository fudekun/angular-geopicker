'use strict';

describe('Service: geopickerConfig', function () {

  // load the service's module
  beforeEach(module('angularGeopickerApp'));

  // instantiate service
  var geopickerConfig;
  beforeEach(inject(function (_geopickerConfig_) {
    geopickerConfig = _geopickerConfig_;
  }));

  it('should do something', function () {
    expect(!!geopickerConfig).toBe(true);
  });

});
