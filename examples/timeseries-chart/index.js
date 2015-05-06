var React = require('react');
var { TimeseriesChart } = require('ld3');
require('../../src/styles.scss');

var _getData = function(nn) {
  var data = [];
  for (var ii = 0; ii < nn; ii++) {
    data.push({
      timestamp: new Date(),
      value: Math.random() * 100,
      formattedValue: 'bla'
    });
  }
  return data;
};

var start = new Date();
var end = new Date();

var groups = [{
  className: 'electricity-group',
  label: 'Electricity',
  series: [{
    className: 'electricity-series',
    color: '#ff00cc',
    data: _getData(12),
    end: end,
    start: start,
    startAtZero: true,
    legendIndex: 0,
    legendLabel: 'Meter 1',
    type: 'column' // clusteredColumn, stackedColumn, differenceColumn, line, area
  },{
    className: 'electricity-series',
    color: '#ff0000',
    data: _getData(12),
    end: end,
    start: start,
    startAtZero: true,
    legendIndex: 1,
    legendLabel: 'Meter 2',
    type: 'line'
   }]
}];

var width = 1024;
React.render(
  <TimeseriesChart
    height={Math.ceil(width * 0.75)}
    groups={groups}
    margins={Math.ceil(width * 0.08)}
    width={width} />,
  document.getElementById('chart')
);
