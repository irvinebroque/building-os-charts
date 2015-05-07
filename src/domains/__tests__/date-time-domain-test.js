var DateTimeDomain = require('../date-time-domain');

describe('DateTimeDomain...', function() {

  var data, data2, timestamps;
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
  });

  it('handles undefined input, returns an empty array', function() {
    expect(DateTimeDomain()).toEqual([]);
  });

  it('handles empty input, returns an empty array', function() {
    expect(DateTimeDomain([])).toEqual([]);
  });

  it('handles input containing all undefined values, returns an empty array', function() {
    var data = [];
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      data.push({timestamp: undefined});
    }
    expect(DateTimeDomain([data])).toEqual([]);
  });

  it('handles input containing all null values, returns an empty array', function() {
    var data = [];
    for (var ii = 0, nn = 10; ii < nn; ii++) {
      data.push({timestamp: null});
    }
    expect(DateTimeDomain([data])).toEqual([]);
  });

  it('handles a single array of dates', function() {
    expect(DateTimeDomain([data])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

  it('handles a single array of dates where some are null or undefined', function() {
    data[2].timestamp = undefined;
    data[8].timestamp = null;
    expect(DateTimeDomain([data])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

  it('handles multiple arrays of dates', function() {
    expect(DateTimeDomain([data, data2])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

  it('handles multiple arrays of dates where some are null or undefined', function() {
    data[2].timestamp = undefined;
    data[8].timestamp = null;
    data[5].timestamp = undefined;
    data[17].timestamp = null;
    expect(DateTimeDomain([data, data2])).toEqual([timestamps[0], timestamps[timestamps.length - 1]]);
  });

});
