var d3 = require('d3');
var moment = require('moment');

var _getExtents = function(series) {
  var extents = [];

  function _getSeriesExtents(timeseries) {
    return d3.extent(timeseries.data, (datum) => {
      if (datum) {
        return moment(datum.timestamp).isValid() ?
          datum.timestamp : undefined;
      }
    });
  }

  for (var ii = 0, nn = series.length; ii < nn; ii++) {
    extents = extents.concat(_getSeriesExtents(series[ii]));
  }
  return d3.extent(extents);
};

module.exports = function(series) {
  if (!series || !series.length) {
    return [];
  }

  var extents = _getExtents(series);
  if (!extents[0] || !extents[1]) {
    return [];
  }

  return [extents[0], extents[1]];
};
