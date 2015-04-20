var { isValid } = require('../number-validator');

describe('NumberValidator...', function() {

  it('rejects undefined', function() {
    expect(isValid()).toBeFalsy();
    expect(isValid(undefined)).toBeFalsy();
  });

  it('rejects objects, arrays, and strings', function() {
    expect(isValid({})).toBeFalsy();
    expect(isValid([])).toBeFalsy();
    expect(isValid('')).toBeFalsy();
    expect(isValid('foo')).toBeFalsy();
  });

  it('rejects null', function() {
    expect(isValid(null)).toBeFalsy();
  });

  it('rejects NaN', function() {
    expect(isValid(NaN)).toBeFalsy();
  });

  it('rejects Infinity', function() {
    expect(isValid(Infinity)).toBeFalsy();
  });

  it('rejects Number.MIN_VALUE', function() {
    expect(isValid(Number.MIN_VALUE)).toBeFalsy();
  });

  it('rejects Number.MAX_VALUE', function() {
    expect(isValid(Number.MAX_VALUE)).toBeFalsy();
  });

  it('rejects Number.NEGATIVE_INFINITY', function() {
    expect(isValid(Number.NEGATIVE_INFINITY)).toBeFalsy();
  });

  it('rejects Number.POSITIVE_INFINITY', function() {
    expect(isValid(Number.POSITIVE_INFINITY)).toBeFalsy();
  });

  it('accepts negative numbers', function() {
    expect(isValid(Math.random() * -100)).toBeTruthy();
  });

  it('accepts positive numbers', function() {
    expect(isValid(Math.random() * 100)).toBeTruthy();
  });

  it('accepts zero', function() {
    expect(isValid(0)).toBeTruthy();
  });

});
