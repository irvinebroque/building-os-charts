var { isValid } = require('../validators/number-validator');

module.exports = function(value, reverse) {
  if (isValid(value)) {
    if (reverse) {
      return [value, 0];
    }
    return [0, value];
  }
  return [0, 0];
};
