var {
  getAttribute,
  getCoordsFromTranslate,
  getRotate,
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
    expect(getAttribute('clip-rect', 'url(#fooBar)')).toEqual('clip-rect="url(#fooBar)"');
    expect(getAttribute('xlink:href', 'https://twitter.com/_floridaman')).toEqual('xlink:href="https://twitter.com/_floridaman"');
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

  it('getRotate returns a rotate transform from and angle and optional x and y coordinates', function() {
    expect(getRotate).toBeDefined();
    expect(getRotate()).toEqual('');
    expect(getRotate(90)).toEqual('rotate(90)');
    expect(getRotate(90, null, null)).toEqual('rotate(90)');
    expect(getRotate(90, 0)).toEqual('rotate(90)');
    expect(getRotate(90, 0, 0)).toEqual('rotate(90 0 0)');
    expect(getRotate(NaN, 0, 0)).toEqual('');
  });

  it('getRoundedRectPath returns path data for a rectangle with rounded corners', function() {
    expect(getRoundedRectPath).toBeDefined();
    expect(getRoundedRectPath()).toEqual('');
    expect(getRoundedRectPath({})).toEqual('');

    expect(getRoundedRectPath({
      width: 100
    })).toEqual('');

    expect(getRoundedRectPath({
      height: 100
    })).toEqual('');

    expect(getRoundedRectPath({
      height: 100,
      width: 100
    })).toEqual('M 0 0 H 100 Q 100 0 100 0 V 100 Q 100 100 100 100 H 0 Q 0 100 0 100 V 0 Q 0 0 0 0');

    expect(getRoundedRectPath({
      height: 100,
      width: 100,
      x: NaN,
      y: NaN
    })).toEqual('M 0 0 H 100 Q 100 0 100 0 V 100 Q 100 100 100 100 H 0 Q 0 100 0 100 V 0 Q 0 0 0 0');

    expect(getRoundedRectPath({
      height: 100,
      width: 100,
      x: 10,
      y: 10
    })).toEqual('M 10 10 H 100 Q 100 10 100 10 V 100 Q 100 100 100 100 H 10 Q 10 100 10 100 V 10 Q 10 10 10 10');

    expect(getRoundedRectPath({
      height: 100,
      width: 100,
      corners: {
        bottomLeft: 10,
        bottomRight: 10,
        topLeft: 10,
        topRight: 10
      }
    })).toEqual('M 10 0 H 90 Q 100 0 100 10 V 90 Q 100 100 90 100 H 10 Q 0 100 0 90 V 10 Q 0 0 10 0');

    expect(getRoundedRectPath({
      height: 100,
      width: 100,
      corners: {
        bottomLeft: 10
      }
    })).toEqual('M 0 0 H 100 Q 100 0 100 0 V 100 Q 100 100 100 100 H 10 Q 0 100 0 90 V 0 Q 0 0 0 0');

    expect(getRoundedRectPath({
      height: 100,
      width: 100,
      x: 10,
      y: 10,
      corners: {
        bottomLeft: 10,
        bottomRight: 10,
        topLeft: 10,
        topRight: 10
      }
    })).toEqual('M 20 10 H 90 Q 100 10 100 20 V 90 Q 100 100 90 100 H 20 Q 10 100 10 90 V 20 Q 10 10 20 10');

    expect(getRoundedRectPath({
      height: 100,
      width: 100,
      x: 10,
      y: 10,
      corners: {
        bottomLeft: 10
      }
    })).toEqual('M 10 10 H 100 Q 100 10 100 10 V 100 Q 100 100 100 100 H 20 Q 10 100 10 90 V 10 Q 10 10 10 10');

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
