var d3 = require('d3');
var moment = require('moment');
var { isValid } = require('../validators/number-validator');

var _domainIsValid = function(values) {
  if (values && values.length > 1) {
    for (var ii = 0, nn = values.length; ii < nn; ii++) {
      if (!moment(values[ii]).isValid()) {
        return;
      }
    }
    return true;
  }
};

var _rangeIsValid = function(values) {
  if (values && values.length > 1) {
    for (var ii = 0, nn = values.length; ii < nn; ii++) {
      if (!isValid(values[ii])) {
        return;
      }
    }
    return true;
  }
};

module.exports = function(domain, range) {
  if (_domainIsValid(domain) && _rangeIsValid(range)) {
    return d3.time.scale()
      .domain(domain)
      .range(range);
  }
};
