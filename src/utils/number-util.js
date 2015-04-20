var { isValid } = require('../validators/number-validator');

module.exports = {
  isFloat: function(value) {
    if (isValid(value)) {
      if (value.toString().indexOf('.') !== -1) {
        return true;
      }
    }
  }
};
