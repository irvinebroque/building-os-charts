var { isValid } = require('../validators/number-validator');
var assign = require('object-assign');

var _getMargins = function(value) {
  return {
    bottom: value,
    left: value,
    right: value,
    top: value
  };
};

module.exports = function(margins) {
  if (typeof margins === 'number' && isValid(margins)) {
    return _getMargins(margins);
  }

  if (typeof margins === 'object') {
    return assign(_getMargins(0), margins);
  }

  return _getMargins(0);
};
