var { isFloat } = require('../number-util');

describe('NumberUtil...', function() {

  it('can determine if a number is a float', function() {
    expect(isFloat).toBeDefined();
    expect(isFloat()).toBeFalsy();
    expect(isFloat(undefined)).toBeFalsy();
    expect(isFloat(0)).toBeFalsy();
    expect(isFloat(1)).toBeFalsy();
    expect(isFloat(null)).toBeFalsy();
    expect(isFloat(NaN)).toBeFalsy();
    expect(isFloat(Infinity)).toBeFalsy();
    expect(isFloat(Number.MIN_VALUE)).toBeFalsy();
    expect(isFloat(Number.MAX_VALUE)).toBeFalsy();
    expect(isFloat(Number.NEGATIVE_INFINITY)).toBeFalsy();
    expect(isFloat(Number.POSITIVE_INFINITY)).toBeFalsy();
    expect(isFloat(1234.5678)).toBeTruthy();
    expect(isFloat(-1234.5678)).toBeTruthy();
  });

});
