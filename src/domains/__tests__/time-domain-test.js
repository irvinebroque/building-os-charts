var TimeDomain = require('../time-domain');

describe('TimeDomain...', function() {

  var data, data2, timestamps, series, series2;
  beforeEach(function() {
    data = [];
    data2 = [];
    timestamps = [];
    var end = new Date();
    var currentDate = new Date(end);
    for (var ii = 0, nn = 23; ii < nn; ii++) {
      currentDate.setHours(currentDate.getHours() - 1);
      var timestamp = new Date(currentDate);
      data.push({timestamp: timestamp});
      timestamps.push(timestamp);
    }
    timestamps.reverse();
    data2 = data.slice();

    series = {
      data: data
    };
    series2 = {
      data: data2
    };

  });

  it('handles undefined input, returns an empty array', function() {
    expect(TimeDomain()).toEqual([]);
  });

  it('handles empty input, returns an empty array', function() {
    expect(TimeDomain([])).toEqual([]);
  });

  it('handles input containing all undefined values, returns an empty array', function() {
    series.data = [];
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      series.data.push({timestamp: undefined});
    }
    expect(TimeDomain([series])).toEqual([]);
  });

  it('handles input containing all null values, returns an empty array', function() {
    series.data = [];
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      series.data.push({timestamp: null});
    }
    expect(TimeDomain([series])).toEqual([]);
  });

  it('handles a single array of dates', function() {
    expect(TimeDomain([series])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

  it('handles a single array of dates where some are null or undefined', function() {
    series.data[2].timestamp = undefined;
    series.data[8].timestamp = null;
    expect(TimeDomain([series])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

  it('handles multiple arrays of dates', function() {
    expect(TimeDomain([series, series2])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

  it('handles multiple arrays of dates where some are null or undefined', function() {
    series.data[2].timestamp = undefined;
    series.data[8].timestamp = null;
    series2.data[5].timestamp = undefined;
    series2.data[17].timestamp = null;
    expect(TimeDomain([series, series2])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

});
