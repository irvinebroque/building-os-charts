var d3 = require('d3');
var { isValid } = require('../validators/number-validator');

var _isValid = function(values) {
  if (values && values.length > 1) {
    for (var ii = 0, nn = values.length; ii < nn; ii++) {
      if (!isValid(values[ii])) {
        return false;
      }
    }
    return true;
  }
};

module.exports = function(domain, range) {
  if (_isValid(domain) && _isValid(range)) {
    return d3.scale.linear()
      .domain(domain)
      .range(range);
  }
};
