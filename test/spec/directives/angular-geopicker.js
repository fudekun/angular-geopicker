'use strict';

describe('Directive: angularGeopicker', function () {

  // load the directive's module
  beforeEach(module('angularGeopickerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('Default Text', inject(function ($compile) {
    element = angular.element('<input angular-geopicker></input>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.val()).toBe('');
  }));
});
