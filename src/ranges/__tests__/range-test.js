var Range = require('../range');

describe('Range...', function() {

  it('returns [0,0] for invalid input', function() {
    expect(Range()).toEqual([0,0]);
    expect(Range('')).toEqual([0,0]);
    expect(Range({})).toEqual([0,0]);
    expect(Range([])).toEqual([0,0]);
    expect(Range(Infinity)).toEqual([0,0]);
    expect(Range(null)).toEqual([0,0]);
    expect(Range(NaN)).toEqual([0,0]);
    expect(Range(undefined)).toEqual([0,0]);
    expect(Range(Number.MIN_VALUE)).toEqual([0,0]);
    expect(Range(Number.MAX_VALUE)).toEqual([0,0]);
    expect(Range(Number.NEGATIVE_INFINITY)).toEqual([0,0]);
    expect(Range(Number.POSITIVE_INFINITY)).toEqual([0,0]);
  });

  it('returns [0,value] for valid input', function() {
    expect(Range(-100)).toEqual([0, -100]);
    expect(Range(100)).toEqual([0, 100]);
    expect(Range(0)).toEqual([0, 0]);
  });

  it('returns reversed values as requested', function() {
    expect(Range(-100, true)).toEqual([-100, 0]);
    expect(Range(100, true)).toEqual([100, 0]);
    expect(Range(0, true)).toEqual([0, 0]);
  });

});
