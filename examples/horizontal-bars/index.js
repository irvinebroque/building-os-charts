var React = require('react');
var { HorizontalBarChart } = require('building-os-charts');
require('../../src/index.scss');

var data = [];
for (var ii = 0, nn = 20; ii < nn; ii++) {
  var value = Math.random() * 100;
  data.push({
    'detailIcon': 'http://luciddesigngroup.com/test/blocks/img/kiwi/increase.svg',
    'detailLabel': Math.round(value).toString(),
    'label': 'Foo ' + ii,
    'icon': 'http://buildingdashboard.net/images/buildingentityavatar/5904/profile/5c3cd86f-d298-4c40-8ec4-0b21d8fe3a53.png',
    'value': value,
    'corners': {
      topRight: 10,
      bottomRight: 10
    },
    'x': 40
  });
}

React.render(
  <HorizontalBarChart data={data} />,
  document.getElementById('chart')
);
