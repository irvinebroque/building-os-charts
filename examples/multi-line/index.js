var React = require('react');
var { TimeseriesChart } = require('ld3');
var moment = require('moment');
require('../../src/styles.scss');

function getData() {
  var start = moment().startOf('day');
  var end = moment(start).endOf('tomorrow');
  var quarterHour = moment(start).subtract(15, 'minutes');
  var data = [];
  var nn = (48 * 4);
  for (var ii = 0; ii < nn; ii++) {
    quarterHour.add(15, 'minutes');
    data.push({
      timestamp: moment(quarterHour).toDate(),
      value: Math.random() * 100
    });
  }
  return data;
}

var data1 = getData();
var data2 = getData();

var groups = [{
  label: 'kWh',
  type: 'line',
  series: [{
    data: data1,
    legendLabel: 'Electricity 1',
    marker: 'smooth',
    style: {
      stroke: 'green'
    }
  },{
    data: data2,
    legendLabel: 'Electricity 2',
    marker: 'smooth',
    style: {
      stroke: 'yellow'
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
