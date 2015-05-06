var BoxUtil = require('../box-util');

describe('BoxUtil', function() {

  it('returns uniform defaults of 0 for invalid input', function() {
    expect(BoxUtil()).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(BoxUtil('')).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(BoxUtil([])).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(BoxUtil(NaN)).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
  });

  it('return an object with uniform values from valid numeric input', function() {
    expect(BoxUtil(0)).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    expect(BoxUtil(10)).toEqual({
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    });
  });

  it('return an object with unique values from object input', function() {
    expect(BoxUtil({
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

    expect(BoxUtil({
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
    expect(BoxUtil({
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
