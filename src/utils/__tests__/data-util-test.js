var { stretch } = require('../data-util');

describe('DataUtil', function() {

  it('stretches timeseries data by duplicating the last existing item', function() {
    expect(stretch()).toBeUndefined();
    expect(stretch([])).toEqual([]);
    expect(stretch([{}, {}])).toEqual([{}, {}]);

    var end = new Date();
    var start = new Date(end);
    start.setDate(start.getDate() - 1);
    var expected = new Date(end);
    expected.setDate(expected.getDate() + 1);
    expect(stretch([
      {timestamp: start, value: 1},
      {timestamp: end, value: 2}
    ])).toEqual([{
      timestamp: start, value: 1},
      {timestamp: end, value: 2},
      {timestamp: expected, value: 2}
    ]);
  });

});
