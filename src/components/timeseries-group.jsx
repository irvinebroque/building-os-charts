var React = require('react');
var { array, bool, func, number, object, string } = React.PropTypes;
var classNames = require('classnames');
var LinearDomain = require('../domains/linear-domain');
var TimeDomain = require('../domains/time-domain');
var Range = require('../ranges/range');
var LinearScale = require('../scales/linear-scale');
var TimeScale = require('../scales/time-scale');
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
    height: number.isRequired,
    label: string.isRequired,
    margins: object.isRequired,
    series: array.isRequired,
    startAtZero: bool.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      label: '',
      margins: {},
      series: [],
      startAtZero: true,
      width: 0
    };
  },

  getTimeSeries: function(type) {
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
    var scaleX = TimeScale(
      TimeDomain(this.props.series),
      Range(this.props.width)
    );
    var scaleY = LinearScale(
      LinearDomain(this.props.series, this.props.startAtZero),
      Range(this.props.height, true)
    );

    return (
      <g className={classNames('timeseries-group', this.props.className)}>
        {this.props.series.map((datum, index) => {
          var TimeSeries = this.getTimeSeries(datum.type);
          return (
            <TimeSeries
              className={datum.className}
              data={datum.data}
              height={this.props.height}
              key={index}
              scaleX={scaleX}
              scaleY={scaleY}
              style={datum.style}
              width={this.props.width} />
          );
        })}
      </g>
    );
  }

});
