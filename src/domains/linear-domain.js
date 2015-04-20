var d3 = require('d3');
var { isValid } = require('../validators/number-validator');

var _getData = function(args) {
  var data = [];
  args.forEach(function(datum) {
    if (typeof datum !== 'boolean') {
      data.push(datum);
    }
  });
  return data;
};

var _getExtents = function(args) {
  var data = _getData(args);
  var extents = [];
  data.forEach(function(datum) {
    extents = extents.concat(d3.extent(datum, function(values) {
      if (isValid(values.value)) {
        return values.value;
      }
    }));
  });
  return d3.extent(extents);
};

var _getStartAtZero = function(args) {
  var startAtZero = false;
  args.forEach(function(datum) {
    if (typeof datum === 'boolean' && datum) {
      startAtZero = true;
    }
  });
  return startAtZero;
};

module.exports = function(...args) {
  if (!args || !args.length) {
    return [0, 0];
  }

  var extents = _getExtents(args);
  var min = extents[0];
  var max = extents[1];

  if (!isValid(min)) {
    min = 0;
  }
  if (!isValid(max)) {
    max = 0;
  }

  if (_getStartAtZero(args) && min > 0) {
    min = 0;
  }
  if (max < min) {
    max = min;
  }

  return [min, max];
};
