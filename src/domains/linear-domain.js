var d3 = require('d3');
var { isValid } = require('../validators/number-validator');

var _getExtents = function(series) {
  var extents = [];

  function _getSeriesExtents(timeseries) {
    return d3.extent(timeseries.data, (datum) => {
      if (datum && isValid(datum.value)) {
        return datum.value;
      }
    });
  }

  for (var ii = 0, nn = series.length; ii < nn; ii++) {
    extents = extents.concat(_getSeriesExtents(series[ii]));
  }
  return d3.extent(extents);
};

module.exports = function(series, clampToZero) {
  if (!series || !series.length) {
    return [0, 0];
  }

  var extents = _getExtents(series);
  var min = isValid(extents[0]) ? extents[0] : 0;
  var max = isValid(extents[1]) ? extents[1] : 0;

  if (clampToZero && min > 0) {
    min = 0;
  }

  if (max < min) {
    max = min;
  }

  return [min, max];
};
