var React = require('react');
var { TimeseriesChart } = require('ld3');
var moment = require('moment');
require('../../src/theme.scss');

function getData() {
  var start = moment().startOf('week');
  var end = moment(start).endOf('week');
  var hour = moment(start).subtract(1, 'hour');
  var data = [];
  var nn = (24 * 7);
  for (var ii = 0; ii < nn; ii++) {
    hour.add(1, 'hour');
    data.push({
      timestamp: moment(hour).toDate(),
      value: Math.random() * 100
    });
  }
  return data;
}

var data = getData();
var groups = [{
  label: 'kWh',
  type: 'area',
  series: [{
    data: data,
    legendLabel: 'Electricity',
    marker: 'smooth'
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
