var d3 = require('d3');

var _getExtents = function(series) {
  var extents = [];
  for (var ii = 0, nn = series.length; ii < nn; ii++) {
    extents = extents.concat(d3.extent(series[ii], function(datum) {
      if (datum) {
        return datum.timestamp ? datum.timestamp : undefined;
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
