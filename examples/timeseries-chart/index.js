var React = require('react');
var { TimeseriesChart } = require('ld3');
require('../../src/styles.scss');

var _getData = function(nn, color) {
  var start = new Date();
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);
  var end = new Date(start);

  var data = [];
  for (var ii = 0; ii < nn; ii++) {
    end.setHours(end.getHours() + 1);
    data.push({
      style: {fill: color},
      timestamp: new Date(end),
      value: (Math.random() * 100),
      valueFormatted: 'bla'
    });
  }
  return data;
};

var data1 = _getData(24, 'blue');
var data2 = _getData(24, 'red');

var groups = [{
  clampToZero: true,
  label: 'Electricity 1',
  series: [{
    type: 'area',
    data: data1,
    legendLabel: 'Meter 1'
  }]
},{
  clampToZero: true,
  label: 'Electricity 2',
  series: [{
    type: 'line',
    data: data2,
    legendLabel: 'Meter 2'
  }]
}];

var width = 1024;
React.render(
  <TimeseriesChart
    height={Math.ceil(width * 0.75)}
    groups={groups}
    margins={Math.ceil(width * 0.04)}
    width={width} />,
  document.getElementById('chart')
);
