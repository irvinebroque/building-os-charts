var { isValid } = require('../validators/number-validator');
var assign = require('object-assign');

var _getBox = function(value) {
  return {
    bottom: value,
    left: value,
    right: value,
    top: value
  };
};

module.exports = function(input) {
  if (typeof input === 'number' && isValid(input)) {
    return _getBox(input);
  }

  if (typeof input === 'object') {
    return assign(_getBox(0), input);
  }

  return _getBox(0);
};
