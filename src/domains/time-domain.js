var d3 = require('d3');
var moment = require('moment');

var _getExtents = function(series) {
  var extents = [];
  for (var ii = 0, nn = series.length; ii < nn; ii++) {
    extents = extents.concat(d3.extent(series[ii].data, function(datum) {
      if (datum) {
        return moment(datum.timestamp).isValid() ? datum.timestamp : undefined;
      }
    }));
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
