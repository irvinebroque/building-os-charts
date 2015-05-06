var d3 = require('d3');
var { isValid } = require('../validators/number-validator');

var _getExtents = function(data) {
  var extents = [];
  for (var ii = 0, nn = data.length; ii < nn; ii++) {
    var series = data[ii];
    extents = extents.concat(d3.extent(series, function(datum) {
      if (isValid(datum.value)) {
        return datum.value;
      }
    }));
  }
  return d3.extent(extents);
};

module.exports = function(data, startAtZero) {
  if (!data || !data.length) {
    return [0, 0];
  }

  var extents = _getExtents(data);
  var min = extents[0];
  var max = extents[1];

  if (!isValid(min)) {
    min = 0;
  }
  if (!isValid(max)) {
    max = 0;
  }

  if (startAtZero && min > 0) {
    min = 0;
  }
  if (max < min) {
    max = min;
  }

  return [min, max];
};
