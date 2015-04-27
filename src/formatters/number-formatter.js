var d3 = require('d3');
var { isFloat } = require('../utils/number-util');
var { isValid } = require('../validators/number-validator');

module.exports = {

  format: function(value, abbreviate) {
    if (!isValid(value)) {
      return '';
    }

    var specifier = ',.0f';
    var valueToFormat = Number(value);

    if (isFloat(value) && value !== 0) {
      if (valueToFormat > -10 && value < 10) {
        specifier = '.2f';
      }
    }

    if (abbreviate) {
      if (value <= -1000 || value >= 1000) {
        valueToFormat = Math.round(value / 100) * 100;
        specifier = 's';
      }
    }

    var format = d3.format(specifier);
    return format(valueToFormat);
  }
  
};
