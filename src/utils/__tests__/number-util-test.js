var NumberUtil = require('../number-util');

describe('NumberUtil...', function() {

  it('can determine if a number is a float', function() {
    expect(NumberUtil.isFloat).toBeDefined();
    expect(NumberUtil.isFloat()).toBeFalsy();
    expect(NumberUtil.isFloat(undefined)).toBeFalsy();
    expect(NumberUtil.isFloat(0)).toBeFalsy();
    expect(NumberUtil.isFloat(1)).toBeFalsy();
    expect(NumberUtil.isFloat(null)).toBeFalsy();
    expect(NumberUtil.isFloat(NaN)).toBeFalsy();
    expect(NumberUtil.isFloat(Infinity)).toBeFalsy();
    expect(NumberUtil.isFloat(Number.MIN_VALUE)).toBeFalsy();
    expect(NumberUtil.isFloat(Number.MAX_VALUE)).toBeFalsy();
    expect(NumberUtil.isFloat(Number.NEGATIVE_INFINITY)).toBeFalsy();
    expect(NumberUtil.isFloat(Number.POSITIVE_INFINITY)).toBeFalsy();
    expect(NumberUtil.isFloat(1234.5678).toBeTruthy();
    expect(NumberUtil.isFloat(-1234.5678)).toBeTruthy();
  });

});
