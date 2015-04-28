var { isValid } = require('../validators/number-validator');

module.exports = {

  getAttribute: function(name, value) {
    if (!name) {
      return;
    }
    return [name, '="', value, '"'].join('');
  },

  getCoordsFromTranslate: function(translate) {
    if (translate) {
      var regExp = /\(([^)]+)\)/;
      var matches = regExp.exec(translate);
      if (!matches) {
        return;
      }
      var coords = matches[1].split(',');
      var posX = parseFloat(coords[0]);
      var posY = parseFloat(coords[1]);
      return [posX, posY];
    }
  },

  getRoundedRectPath: function(width, height, corners) {
    if (!isValid(width) || !isValid(height) || !corners) {
      return '';
    }
    var propNames = [
      'bottomLeft',
      'bottomRight',
      'topLeft',
      'topRight'
    ];
    for (var ii = 0, nn = propNames.length; ii < nn; ii++) {
      var propName = propNames[ii];
      if (!corners.hasOwnProperty(propName)) {
        return '';
      }
    }

    return [
      'M ' + corners.topLeft + ' 0',
      'H ' + (width - corners.topRight),
      'Q ' + [width, 0, width, corners.topRight].join(' '),
      'V ' + (height - corners.bottomRight),
      'Q ' + [width, height, (width - corners.bottomRight), height].join(' '),
      'H ' + corners.bottomLeft,
      'Q ' + [0, height, 0, (height - corners.bottomLeft)].join(' '),
      'V ' + corners.topLeft,
      'Q ' + [0, 0, corners.topLeft, 0].join(' ')
    ].join(' ');
  },

  getTranslateFromCoords: function(posX, posY) {
    if (!isValid(posX) || !isValid(posY)) {
      return;
    }
    return 'translate(' + Math.ceil(posX) + ',' + Math.ceil(posY) + ')';
  }

};
