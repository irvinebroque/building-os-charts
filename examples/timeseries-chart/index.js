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
  label: 'Electricity',
  className: 'electricity-group',
  showVerticalAxis: true,
  showHorizontalAxis: true,
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

React.render(
  <TimeseriesChart groups={groups} />,
  document.getElementById('chart')
);
