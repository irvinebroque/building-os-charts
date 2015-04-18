var NumberValidator = require('../number-validator');

describe('Number validator', function() {

  it('rejects undefined', function() {
    expect(NumberValidator()).toBeFalsy();
    expect(NumberValidator(undefined)).toBeFalsy();
  });

  it('rejects objects, arrays, and strings', function() {
    expect(NumberValidator({})).toBeFalsy();
    expect(NumberValidator([])).toBeFalsy();
    expect(NumberValidator('')).toBeFalsy();
    expect(NumberValidator('foo')).toBeFalsy();
  });

  it('rejects null', function() {
    expect(NumberValidator(null)).toBeFalsy();
  });

  it('rejects NaN', function() {
    expect(NumberValidator(NaN)).toBeFalsy();
  });

  it('rejects Infinity', function() {
    expect(NumberValidator(Infinity)).toBeFalsy();
  });

  it('rejects Number.MIN_VALUE', function() {
    expect(NumberValidator(Number.MIN_VALUE)).toBeFalsy();
  });

  it('rejects Number.MAX_VALUE', function() {
    expect(NumberValidator(Number.MAX_VALUE)).toBeFalsy();
  });

  it('rejects Number.NEGATIVE_INFINITY', function() {
    expect(NumberValidator(Number.NEGATIVE_INFINITY)).toBeFalsy();
  });

  it('rejects Number.POSITIVE_INFINITY', function() {
    expect(NumberValidator(Number.POSITIVE_INFINITY)).toBeFalsy();
  });

  it('accepts negative numbers', function() {
    expect(NumberValidator(Math.random() * -100)).toBeTruthy();
  });

  it('accepts positive numbers', function() {
    expect(NumberValidator(Math.random() * 100)).toBeTruthy();
  });

  it('accepts zero', function() {
    expect(NumberValidator(0)).toBeTruthy();
  });

});
