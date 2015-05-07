var LinearScale = require('../time-scale');

describe('TimeScale...', function() {

  var date = new Date();

  it('returns undefined for invalid domains', function() {
    expect(LinearScale()).toBeUndefined();
    expect(LinearScale([])).toBeUndefined();
    expect(LinearScale([date])).toBeUndefined();
    expect(LinearScale([date, null])).toBeUndefined();
    expect(LinearScale([null, date])).toBeUndefined();
    expect(LinearScale([null, null])).toBeUndefined();
  });

  it('returns undefined for invalid ranges', function() {
    expect(LinearScale([date, date])).toBeUndefined();
    expect(LinearScale([date, date], [])).toBeUndefined();
    expect(LinearScale([date, date], [1])).toBeUndefined();
    expect(LinearScale([date, date], [1, null])).toBeUndefined();
    expect(LinearScale([date, date], [null, 1])).toBeUndefined();
    expect(LinearScale([date, date], [null, null])).toBeUndefined();
  });

  // tests for the scale itself covered by d3

});
