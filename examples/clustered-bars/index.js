var React = require('react');
var { TimeseriesChart } = require('ld3');
var moment = require('moment');
require('../../src/theme.scss');

function getData() {
  var start = moment().startOf('month');
  var end = moment(start).endOf('month');
  var day = moment(start).subtract(1, 'day');
  var data = [];
  var nn = start.daysInMonth();
  for (var ii = 0; ii < nn; ii++) {
    day.add(1, 'day');
    data.push({
      timestamp: moment(day).toDate(),
      value: Math.random() * 100
    });
  }
  return data;
}

var data1 = getData();
var data2 = getData();

var groups = [{
  label: 'kWh',
  type: 'clusteredBar',
  series: [{
    data: data1,
    legendLabel: 'Electricity 1',
    marker: 'smooth'
  },{
    data: data2,
    legendLabel: 'Electricity 2',
    marker: 'smooth',
    style: {
      fill: 'blue'
    }
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
