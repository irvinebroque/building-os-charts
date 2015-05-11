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
    //end.setMinutes(end.getMinutes() + 1);
    end.setHours(end.getHours() + 1);
    //end.setDate(end.getDate() + 1);
    data.push({
      style: {fill: color},
      timestamp: new Date(end),
      value: (Math.random() * 100) - 50,
      valueFormatted: 'bla'
    });
  }
  return data;
};

var groups = [{
  clampToZero: true,
  label: 'Electricity',
  type: 'clusteredBar',
  series: [{
    data: _getData(24, '#ccc'),
    legendLabel: 'Meter 1'
  },{
    data: _getData(24, '#ff00cc'),
    legendLabel: 'Meter 2'
  },{
    data: _getData(24, 'blue'),
    legendLabel: 'Meter 3'
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
