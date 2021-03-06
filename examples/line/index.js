var React = require('react');
var { TimeseriesChart } = require('building-os-charts');
var moment = require('moment');
require('../../src/index.scss');

function getData() {
  var start = moment().startOf('day');
  var end = moment(start).endOf('day');
  var quarterHour = moment(start).subtract(15, 'minutes');
  var data = [];
  var nn = (24 * 4);
  for (var ii = 0; ii < nn; ii++) {
    quarterHour.add(15, 'minutes');
    data.push({
      timestamp: moment(quarterHour).toDate(),
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
    marker: 'smooth',
    style: {
      fill: 'gray',
      stroke: 'black'
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
