var d3 = require('d3');
var Events = require('./events');

module.exports = d3.dispatch(
  Events.DATA_HOVER,
  Events.MOUSE_MOVE,
  Events.MOUSE_OUT
);
