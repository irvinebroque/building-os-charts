var NumberValidator = require('../validators/number-validator');

module.exports = {
  isFloat: function(value) {
    if (NumberValidator(value)) {
      if (value.toString().indexOf('.') !== -1) {
        return true;
      }
    }
  }
};
