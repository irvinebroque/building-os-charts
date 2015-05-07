var React = require('react');
var { array, func, number, object, string } = React.PropTypes;
var AreaSeries = require('./area-series.jsx');
var BarSeries = require('./bar-series.jsx');
var ClusteredBarSeries = require('./clustered-bar-series.jsx');
var DifferenceBarSeries = require('./difference-bar-series.jsx');
var LineSeries = require('./line-series.jsx');
var PlotSeries = require('./plot-series.jsx');
var StackedSeries = require('./stacked-bar-series.jsx');

module.exports = React.createClass({

  propTypes: {
    className: string,
    color: string,
    data: array.isRequired,
    height: number.isRequired,
    scaleX: func.isRequired,
    scaleY: func.isRequired,
    type: string.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      legendLabel: '',
      scaleX: Function,
      scaleY: Function,
      type: '',
      width: 0
    };
  },

  getSeries: function(type) {
    switch (type) {
      case 'area':
        return AreaSeries;
      case 'bar':
        return BarSeries;
      case 'clusteredBar':
        return ClusteredBarSeries;
      case 'differenceBar':
        return DifferenceBarSeries;
      case 'line':
        return LineSeries;
      case 'plot':
        return PlotSeries;
      case 'stackedBar':
        return StackedBarSeries;
      default:
        return null;
    }
  },

  render: function() {
    var Series = this.getSeries(this.props.type);
    return (
      <Series data={this.props.data} />
    );
  }

});
