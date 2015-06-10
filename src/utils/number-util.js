var { isValid } = require('../validators/number-validator');

module.exports = {

  isFloat(value) {
    if (isValid(value)) {
      if (value.toString().indexOf('.') !== -1) {
        return true;
      }
    }
  }
};
