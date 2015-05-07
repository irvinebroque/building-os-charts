var React = require('react');
var { TimeseriesChart } = require('ld3');
require('../../src/styles.scss');


var end = new Date();
var start = new Date(end);
start.setDate(start.getDate() - 1);

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


var groups = [{
  className: 'electricity-group',
  label: 'Electricity',
  startAtZero: true,
  series: [{
    data: _getData(24),
    legendLabel: 'Meter 1',
    styles: {
      fill: '#ff00cc'
    },
    type: 'bar'
  }/*,{
    className: 'electricity-series',
    color: '#ff0000',
    data: _getData(24),
    legendIndex: 1,
    legendLabel: 'Meter 2',
    type: 'line'
   }*/
  ]

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
