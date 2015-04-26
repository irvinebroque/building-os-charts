var {
  getCoordsFromTranslate,
  getTranslateFromCoords
} = require('../svg-util');

describe('SvgUtil', function() {

  it('returns x and y coordinates from translate transform', function() {
    expect(getCoordsFromTranslate).toBeDefined();
    expect(getCoordsFromTranslate()).toBeFalsy();
    expect(getCoordsFromTranslate('')).toBeFalsy();
    expect(getCoordsFromTranslate('translate')).toBeFalsy();
    expect(getCoordsFromTranslate('translate(10,10)')).toEqual([10,10]);
    expect(getCoordsFromTranslate('translate(10)')).toBeDefined();
    expect(getCoordsFromTranslate('translate(10,NaN)')).toBeDefined();
  });

  it('returns a translate transform from given x and y coordinates', function() {
    expect(getTranslateFromCoords).toBeDefined();
    expect(getTranslateFromCoords()).toBeFalsy();
    expect(getTranslateFromCoords([])).toBeFalsy();
    expect(getTranslateFromCoords({})).toBeFalsy();
    expect(getTranslateFromCoords('')).toBeFalsy();
    expect(getTranslateFromCoords(0)).toBeFalsy();
    expect(getTranslateFromCoords(undefined,0)).toBeFalsy();
    expect(getTranslateFromCoords(NaN,0)).toBeFalsy();
    expect(getTranslateFromCoords(Infinity,0)).toBeFalsy();
    expect(getTranslateFromCoords(null,0)).toBeFalsy();
    expect(getTranslateFromCoords(0,0)).toEqual('translate(0,0)');
    expect(getTranslateFromCoords(123,456)).toEqual('translate(123,456)');
  });

});
