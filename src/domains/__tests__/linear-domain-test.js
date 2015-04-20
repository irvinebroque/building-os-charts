var LinearDomain = require('../linear-domain');

describe('LinearDomain...', function() {

  it('handles undefined input, returns [0,0]', function() {
    expect(LinearDomain()).toEqual([0,0]);
  });

  it('handles empty input, returns [0,0]', function() {
    expect(LinearDomain([])).toEqual([0,0]);
  });

  it('handles input containing all undefined values, returns [0,0]', function() {
    var data = [];
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      data.push({value: undefined});
    }
    expect(LinearDomain(data)).toEqual([0,0]);
  });

  it('handles input containing all null values, returns [0,0]', function() {
    var data = [];
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      data.push({value: null});
    }
    expect(LinearDomain(data)).toEqual([0,0]);
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
    var data = [];
    for (var ii = 0, nn = invalid.length; ii < nn; ii++) {
      data.push({value: invalid[ii]});
    }
    expect(LinearDomain(data)).toEqual([0,0]);
  });

  it('handles a single array of positive numbers', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii + 1});
    }
    expect(LinearDomain(data)).toEqual([1,20]);
  });

  it('handles a single array of positive numbers where some values are falsy/invalid', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii + 1});
    }
    data[0].value = undefined;
    data[data.length - 1].value = null;
    data[Math.round(data.length * 0.5)].value = NaN;
    expect(LinearDomain(data)).toEqual([2,19]);
  });

  it('handles a single array of positive numbers where startAtZero is true', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii + 1});
    }
    expect(LinearDomain(data, true)).toEqual([0,20]);
  });

  it('handles a single array of positive numbers where startAtZero is true and some values are falsy/invalid', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii + 1});
    }
    data[0].value = undefined;
    data[data.length - 1].value = null;
    data[Math.round(data.length * 0.5)].value = NaN;
    expect(LinearDomain(data, true)).toEqual([0,19]);
  });

  it('handles a single array of negative numbers', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii - 100});
    }
    expect(LinearDomain(data)).toEqual([-100,-81]);
  });

  it('handles a single array of negative numbers where some values are falsy/invalid', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii - 100});
    }
    data[0].value = undefined;
    data[data.length - 1].value = null;
    data[Math.round(data.length * 0.5)].value = NaN;
    expect(LinearDomain(data)).toEqual([-99,-82]);
  });

  it('handles a single array of negative numbers where startAtZero is true', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii - 100});
    }
    expect(LinearDomain(data, true)).toEqual([-100,-81]);
  });

  it('handles a single array of negative numbers where startAtZero is true and some values are falsy/invalid', function() {
    var data = [];
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      data.push({value: ii - 100});
    }
    data[0].value = undefined;
    data[data.length - 1].value = null;
    data[Math.round(data.length * 0.5)].value = NaN;
    expect(LinearDomain(data, true)).toEqual([-99,-82]);
  });

  it('handles multiple arrays of positive numbers', function() {
    var data1 = [];
    var data2 = [];
    var counter;
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      counter = ii + 1;
      data1.push({value: counter});
      data2.push({value: counter * 10});
    }
    expect(LinearDomain(data1, data2)).toEqual([1,200]);
  });

  it('handles multiple arrays of positive and negative numbers', function() {
    var data1 = [];
    var data2 = [];
    var counter;
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      data1.push({value: counter});
      data2.push({value: counter - 11});
    }
    expect(LinearDomain(data1, data2)).toEqual([-10,10]);
  });

  it('handles multiple arrays of positive and negative and falsy/invalid numbers', function() {
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var counter;
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      data1.push({value: counter});
      data2.push({value: counter - 11});
      data3.push({value: counter});
    }
    data3[0].value = undefined;
    data3[data3.length - 1].value = null;
    data3[Math.round(data3.length * 0.5)].value = NaN;
    expect(LinearDomain(data1, data2, data3)).toEqual([-10,10]);
  });

  it('handles multiple arrays of positive numbers where startAtZero is true', function() {
    var data1 = [];
    var data2 = [];
    var counter;
    for (var ii = 0, nn = 20; ii < nn; ii++) {
      counter = ii + 1;
      data1.push({value: counter});
      data2.push({value: counter * 10});
    }
    expect(LinearDomain(data1, data2, true)).toEqual([0,200]);
  });

  it('handles multiple arrays of positive and negative numbers where startAtZero is true', function() {
    var data1 = [];
    var data2 = [];
    var counter;
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      data1.push({value: counter});
      data2.push({value: counter - 11});
    }
    expect(LinearDomain(data1, data2, true)).toEqual([-10,10]);
  });

  it('handles multiple arrays of positive and negative and falsy/invalid numbers where startAtZero is true', function() {
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var counter;
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      counter = ii + 1;
      data1.push({value: counter});
      data2.push({value: counter - 11});
      data3.push({value: counter});
    }
    data3[0].value = undefined;
    data3[data3.length - 1].value = null;
    data3[Math.round(data3.length * 0.5)].value = NaN;
    expect(LinearDomain(data1, data2, data3, true)).toEqual([-10,10]);
  });

});
