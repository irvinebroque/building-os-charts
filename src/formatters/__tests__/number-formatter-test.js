var { format } = require('../number-formatter');

describe('NumberFormatter...', function() {

  it('returns an empty string for invalid numbers', function() {
    expect(format()).toEqual('');
    expect(format('')).toEqual('');
    expect(format({})).toEqual('');
    expect(format([])).toEqual('');
    expect(format(Infinity)).toEqual('');
    expect(format(null)).toEqual('');
    expect(format(NaN)).toEqual('');
    expect(format(Number.MIN_VALUE)).toEqual('');
    expect(format(Number.MAX_VALUE)).toEqual('');
    expect(format(undefined)).toEqual('');
    expect(format(0)).not.toEqual('');
    expect(format(-10)).not.toEqual('');
    expect(format(10)).not.toEqual('');
    expect(format(10.123)).not.toEqual('');
    expect(format(-10.123)).not.toEqual('');
    expect(format(Math.random())).not.toEqual('');
    expect(format(Math.PI)).not.toEqual('');
  });

  it('formats zero as a plain 0', function() {
    expect(format(0)).toEqual('0');
    expect(format(0.0000000000)).toEqual('0');
  });

  it('formats whole numbers with no decimal places', function() {
    expect(format(1)).toEqual('1');
    expect(format(-1)).toEqual('-1');
    expect(format(1.00)).toEqual('1');
    expect(format(-1.00)).toEqual('-1');
    expect(format(1.00)).toEqual('1');
    expect(format(-1.00)).toEqual('-1');
  });

  it('formats floats between -10 and 10 with two decimal places', function() {
    expect(format(3.1)).toEqual('3.10');
    expect(format(-3.1)).toEqual('-3.10');
    expect(format(Math.PI)).toEqual('3.14');
    expect(format(-Math.PI)).toEqual('-3.14');
  });

  it('formats numbers greater than or equal to 1000 with comma separation and no decimal places', function() {
    expect(format(1000)).toEqual('1,000');
    expect(format(1000.0120)).toEqual('1,000');
    expect(format(10000.0120)).toEqual('10,000');
    expect(format(1000000.0120)).toEqual('1,000,000');
    expect(format(10000000.0120)).toEqual('10,000,000');
    expect(format(100000000.0120)).toEqual('100,000,000');
    expect(format(1000000000.0120)).toEqual('1,000,000,000');
  });

  it('formats numbers less than or equal to -1000 with comma separation and no decimal places', function() {
    expect(format(-1000)).toEqual('-1,000');
    expect(format(-1000.0120)).toEqual('-1,000');
    expect(format(-10000.0120)).toEqual('-10,000');
    expect(format(-1000000.0120)).toEqual('-1,000,000');
    expect(format(-10000000.0120)).toEqual('-10,000,000');
    expect(format(-100000000.0120)).toEqual('-100,000,000');
    expect(format(-1000000000.0120)).toEqual('-1,000,000,000');
  });

  it('formats numbers outside the range -1000 to 1000 with abbreviation and one decimal place where requested', function() {
    expect(format(999, true)).toEqual('999');
    expect(format(-999, true)).toEqual('-999');
    expect(format(1000, true)).toEqual('1k');
    expect(format(-1000, true)).toEqual('-1k');
    expect(format(1500, true)).toEqual('1.5k');
    expect(format(-1500, true)).toEqual('-1.5k');
    expect(format(1549, true)).toEqual('1.5k');
    expect(format(-1549, true)).toEqual('-1.5k');
    expect(format(1551, true)).toEqual('1.6k');
    expect(format(-1551, true)).toEqual('-1.6k');
    expect(format(1575.4564564, true)).toEqual('1.6k');
    expect(format(-1575.4564564, true)).toEqual('-1.6k');
  });

});
