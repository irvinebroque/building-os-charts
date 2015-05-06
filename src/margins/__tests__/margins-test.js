var Margins = require('../margins');

describe('Margins', function() {

  it('returns uniform defaults of 0 for invalid input', function() {
    expect(Margins()).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(Margins('')).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(Margins([])).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(Margins(NaN)).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
  });

  it('return an object with uniform values from valid numeric input', function() {
    expect(Margins(0)).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(Margins(10)).toEqual({
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    });
  });

  it('return an object with unique values from object input', function() {
    expect(Margins({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });

    expect(Margins({
      top: 1,
      right: 2,
      bottom: 3,
      left: 4
    })).toEqual({
      top: 1,
      right: 2,
      bottom: 3,
      left: 4
    });
  });

  it('return an object with unique values from object input with missing props', function() {
    expect(Margins({
      top: 1,
      left: 4
    })).toEqual({
      top: 1,
      right: 0,
      bottom: 0,
      left: 4
    });
  });


});
