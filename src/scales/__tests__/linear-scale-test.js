var LinearScale = require('../linear-scale');

describe('LinearScale...', function() {

  it('returns undefined for invalid domains', function() {
    expect(LinearScale()).toBeUndefined();
    expect(LinearScale([])).toBeUndefined();
    expect(LinearScale([0])).toBeUndefined();
    expect(LinearScale([0, null])).toBeUndefined();
    expect(LinearScale([null, 100])).toBeUndefined();
    expect(LinearScale([null, null])).toBeUndefined();
  });

  it('returns undefined for invalid ranges', function() {
    expect(LinearScale([0, 10])).toBeUndefined();
    expect(LinearScale([0, 10], [])).toBeUndefined();
    expect(LinearScale([0, 10], [1])).toBeUndefined();
    expect(LinearScale([0, 10], [1, null])).toBeUndefined();
    expect(LinearScale([0, 10], [null, 1])).toBeUndefined();
    expect(LinearScale([0, 10], [null, null])).toBeUndefined();
  });

  // tests for the scale itself covered by d3

});
