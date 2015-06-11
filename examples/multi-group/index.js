var React = require('react');
var { TimeseriesChart } = require('building-os-charts');
var moment = require('moment');
require('../../src/index.scss');

function getData() {
  var start = moment().startOf('year');
  var end = moment(start).endOf('year');
  var month = moment(start).subtract(1, 'month');
  var data = [];
  var nn = 12;
  for (var ii = 0; ii < nn; ii++) {
    month.add(1, 'month');
    data.push({
      timestamp: moment(month).toDate(),
      value: Math.random() * 100
    });
  }
  return data;
}

var data1 = getData();
var data2 = getData();

var groups = [{
  label: 'kWh',
  series: [{
    data: data1,
    legendLabel: 'Electricity',
    style: {
      fill: 'green'
    },
    type: 'bar'
  }]
},{
  label: 'kWh',
  series: [{
    data: data2,
    legendLabel: 'PV Generation',
    style: {
      stroke: 'yellow'
    },
    type: 'line'
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
