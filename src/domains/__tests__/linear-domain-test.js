var LinearDomain = require('../linear-domain');

describe('LinearDomain...', function() {

  var series, series2, series3, counter;
  beforeEach(function() {
    series = {
      data: []
    };
    series2 = {
      data: []
    };
    series3 = {
      data: []
    };
  });

  it('handles undefined input, returns [0,0]', function() {
    expect(LinearDomain()).toEqual([0,0]);
  });

  it('handles empty input, returns [0,0]', function() {
    expect(LinearDomain([])).toEqual([0,0]);
  });

  it('handles input containing all undefined values, returns [0,0]', function() {
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      series.data.push({value: undefined});
    }
    expect(LinearDomain([series])).toEqual([0,0]);
  });

  it('handles input containing all null values, returns [0,0]', function() {
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      series.data.push({value: null});
    }
    expect(LinearDomain([series])).toEqual([0,0]);
  });

  it('handles input containing all invalid number types, returns [0,0]', function() {
    var invalid = [
      NaN,
      Infinity,
      Number.MIN_VALUE,
      Number.MAX_VALUE,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY
    ];
    for (var ii = 0, nn = invalid.length; ii < nn; ii++) {
      series.data.push({value: invalid[ii]});
    }
    expect(LinearDomain([series])).toEqual([0,0]);
  });

  it('handles a single array of positive numbers', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii + 1});
    }
    expect(LinearDomain([series])).toEqual([1,20]);
  });

  it('handles a single array of positive numbers where some values are falsy/invalid', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii + 1});
    }
    series.data[0].value = undefined;
    series.data[series.data.length - 1].value = null;
    series.data[Math.round(series.data.length * 0.5)].value = NaN;
    expect(LinearDomain([series])).toEqual([2,19]);
  });

  it('handles a single array of positive numbers where startAtZero is true', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii + 1});
    }
    expect(LinearDomain([series], true)).toEqual([0,20]);
  });

  it('handles a single array of positive numbers where startAtZero is true and some values are falsy/invalid', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii + 1});
    }
    series.data[0].value = undefined;
    series.data[series.data.length - 1].value = null;
    series.data[Math.round(series.data.length * 0.5)].value = NaN;
    expect(LinearDomain([series], true)).toEqual([0,19]);
  });

  it('handles a single array of negative numbers', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii - 100});
    }
    expect(LinearDomain([series])).toEqual([-100,-81]);
  });

  it('handles a single array of negative numbers where some values are falsy/invalid', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii - 100});
    }
    series.data[0].value = undefined;
    series.data[series.data.length - 1].value = null;
    series.data[Math.round(series.data.length * 0.5)].value = NaN;
    expect(LinearDomain([series])).toEqual([-99,-82]);
  });

  it('handles a single array of negative numbers where startAtZero is true', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii - 100});
    }
    expect(LinearDomain([series], true)).toEqual([-100,-81]);
  });

  it('handles a single array of negative numbers where startAtZero is true and some values are falsy/invalid', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      series.data.push({value: ii - 100});
    }
    series.data[0].value = undefined;
    series.data[series.data.length - 1].value = null;
    series.data[Math.round(series.data.length * 0.5)].value = NaN;
    expect(LinearDomain([series], true)).toEqual([-99,-82]);
  });

  it('handles multiple arrays of positive numbers', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      counter = ii + 1;
      series.data.push({value: counter});
      series2.data.push({value: counter * 10});
    }
    expect(LinearDomain([series, series2])).toEqual([1,200]);
  });

  it('handles multiple arrays of positive and negative numbers', function() {
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      series.data.push({value: counter});
      series2.data.push({value: counter - 11});
    }
    expect(LinearDomain([series, series2])).toEqual([-10,10]);
  });

  it('handles multiple arrays of positive and negative and falsy/invalid numbers', function() {
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      series.data.push({value: counter});
      series2.data.push({value: counter - 11});
      series3.data.push({value: counter});
    }
    series3.data[0].value = undefined;
    series3.data[series3.data.length - 1].value = null;
    series3.data[Math.round(series3.data.length * 0.5)].value = NaN;
    expect(LinearDomain([series, series2, series3])).toEqual([-10,10]);
  });

  it('handles multiple arrays of positive numbers where startAtZero is true', function() {
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      counter = ii + 1;
      series.data.push({value: counter});
      series2.data.push({value: counter * 10});
    }
    expect(LinearDomain([series, series2], true)).toEqual([0,200]);
  });

  it('handles multiple arrays of positive and negative numbers where startAtZero is true', function() {
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      series.data.push({value: counter});
      series2.data.push({value: counter - 11});
    }
    expect(LinearDomain([series, series2], true)).toEqual([-10,10]);
  });

  it('handles multiple arrays of positive and negative and falsy/invalid numbers where startAtZero is true', function() {
    var counter;
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      series.data.push({value: counter});
      series2.data.push({value: counter - 11});
      series3.data.push({value: counter});
    }
    series3.data[0].value = undefined;
    series3.data[series3.data.length - 1].value = null;
    series3.data[Math.round(series3.data.length * 0.5)].value = NaN;
    expect(LinearDomain([series, series2, series3], true)).toEqual([-10,10]);
  });

});
