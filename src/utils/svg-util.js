var { isValid } = require('../validators/number-validator');
var assign = require('object-assign');

module.exports = {

  getAttribute(name, value) {
    if (!name) {
      return '';
    }
    return [name, '="', value, '"'].join('');
  },

  getCoordsFromTranslate(translate) {
    if (translate) {
      var regExp = /\(([^)]+)\)/;
      var matches = regExp.exec(translate);
      if (!matches) {
        return [];
      }
      var coords = matches[1].split(',');
      var x = parseFloat(coords[0]);
      var y = parseFloat(coords[1]);
      return [x, y];
    }
    return [];
  },

  getRotate(angle, x, y) {
    if (!isValid(angle)) {
      return '';
    }

    if (isValid(x) && isValid(y)) {
      return [
        'rotate(',
        [angle, x, y].join(' '),
        ')'
      ].join('');
    }

    return 'rotate(' + angle + ')';
  },

  getRoundedRectPath(props) {
    // Width and height are required:
    if (!props || !isValid(props.width) || !isValid(props.height)) {
      return '';
    }

    // x and y are optional but must be valid if present:
    var x = 0;
    if (props.hasOwnProperty('x') && isValid(props.x)) {
      x = props.x;
    }
    var y = 0;
    if (props.hasOwnProperty('y') && isValid(props.y)) {
      y = props.y;
    }

    // Optional corners default to 0 if none passed:
    var corners = assign({
      bottomLeft: 0,
      bottomRight: 0,
      topLeft: 0,
      topRight: 0
    }, props.corners);
    for (var propName in corners) {
      if (!isValid(corners[propName])) {
        corners[propName] = 0;
      }
    }

    return [
      'M ' + (x + corners.topLeft) + ' ' + y,
      'H ' + (props.width - corners.topRight),
      'Q ' + [props.width, y, props.width, (y + corners.topRight)].join(' '),
      'V ' + (props.height - corners.bottomRight),
      'Q ' + [props.width, props.height, (props.width - corners.bottomRight), props.height].join(' '),
      'H ' + (x + corners.bottomLeft),
      'Q ' + [x, props.height, x, (props.height - corners.bottomLeft)].join(' '),
      'V ' + (y + corners.topLeft),
      'Q ' + [x, y, (x + corners.topLeft), y].join(' ')
    ].join(' ');
  },

  getTranslateFromCoords(x, y) {
    if (!isValid(x) || !isValid(y)) {
      return '';
    }
    return 'translate(' + Math.ceil(x) + ',' + Math.ceil(y) + ')';
  }

};
