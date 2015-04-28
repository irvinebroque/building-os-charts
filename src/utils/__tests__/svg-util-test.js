var {
  getAttribute,
  getCoordsFromTranslate,
  getRoundedRectPath,
  getTranslateFromCoords
} = require('../svg-util');

describe('SvgUtil', function() {

  it('getAttribute returns svg attributes from name/value pairs', function() {
    expect(getAttribute).toBeDefined();
    expect(getAttribute()).toBeUndefined();
    expect(getAttribute('')).toBeUndefined();
    expect(getAttribute('', '')).toBeUndefined();
    expect(getAttribute('', 'bar')).toBeUndefined();
    expect(getAttribute('foo', '')).toEqual('foo=""');
    expect(getAttribute('foo', 'bar')).toEqual('foo="bar"');
    expect(getAttribute('clip-rect', 'url(#fooBar)').toEqual('clip-rect="url(#fooBar)"');
    expect(getAttribute('xlink:href', 'https://twitter.com/_floridaman').toEqual('xlink:href="https://twitter.com/_floridaman"');
  });

  it('getCoordsFromTranslate returns x and y coordinates from translate transform', function() {
    expect(getCoordsFromTranslate).toBeDefined();
    expect(getCoordsFromTranslate()).toBeFalsy();
    expect(getCoordsFromTranslate('')).toBeFalsy();
    expect(getCoordsFromTranslate('translate')).toBeFalsy();
    expect(getCoordsFromTranslate('translate(10,10)')).toEqual([10,10]);
    expect(getCoordsFromTranslate('translate(10)')).toBeDefined();
    expect(getCoordsFromTranslate('translate(10,NaN)')).toBeDefined();
  });

  it('getRoundedRectPath returns path data for a rectangle with rounded corners', function() {
    expect(getRoundedRectPath).toBeDefined();
    expect(getRoundedRectPath()).toEqual('');
    expect(getRoundedRectPath(100)).toEqual('');
    expect(getRoundedRectPath(100, 20)).toEqual('');
    expect(getRoundedRectPath(undefined, 20)).toEqual('');
    expect(getRoundedRectPath(undefined, 20, {})).toEqual('');

    var corners = {
      bottomLeft: 10,
      bottomRight: 10,
      topLeft: 10,
      topRight: 10
    };
    expect(getRoundedRectPath(100, 20, corners)).toEqual('M 10 0 H 90 Q 100 0 100 10 V 10 Q 100 20 90 20 H 10 Q 0 20 0 10 V 10 Q 0 0 10 0');
    delete corners.topRight;
    expect(getRoundedRectPath(100, 20, corners)).toEqual('');
  });

  it('getTranslateFromCoords returns a translate transform from given x and y coordinates', function() {
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
