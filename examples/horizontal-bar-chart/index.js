var React = require('react');
var { HorizontalBarChart } = require('ld3');
require('../../src/styles.scss');

var barHeight = 80;
var data = [];
for (var ii = 0, nn = 20; ii < nn; ii++) {
  var value = Math.random() * 100;
  data.push({
    'detailIcon': 'http://luciddesigngroup.com/test/blocks/img/kiwi/increase.svg',
    'detailLabel': Math.round(value) + ' bars',
    'label': 'Foo ' + ii,
    'icon': 'http://buildingdashboard.net/images/buildingentityavatar/5904/profile/5c3cd86f-d298-4c40-8ec4-0b21d8fe3a53.png',
    //'icon': 'rank',
    'value': value,
    'corners': {
      topRight: 10,
      bottomRight: 10
    },
    'x': barHeight / 2
  });
}

React.render(
  <HorizontalBarChart
    barHeight={barHeight}
    data={data}
    detailIconHeight={barHeight / 2}
    height={768}
    iconHeight={barHeight}
    verticalSpacing={1}
    width={1024} />,
  document.getElementById('chart')
);
