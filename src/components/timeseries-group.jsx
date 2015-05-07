var React = require('react');
var { array, bool, func, number, objectOf, string } = React.PropTypes;
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
var LinearAxis = require('./linear-axis.jsx');
var HorizontalGridLines = require('./horizontal-grid-lines.jsx');

module.exports = React.createClass({

  propTypes: {
    className: string,
    height: number.isRequired,
    index: number.isRequired,
    label: string.isRequired,
    margins: objectOf(number).isRequired,
    numTicks: number,
    series: array.isRequired,
    startAtZero: bool.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      index: 0,
      label: '',
      margins: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      },
      numTicks: 5,
      series: [],
      startAtZero: true,
      width: 0
    };
  },

  getTickPadding: function(index, margins) {
    return index ?
      Math.ceil(margins.right / 10) :
      Math.floor(margins.left / 10)
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
      Range(this.props.width));

    var scaleY = LinearScale(
      LinearDomain(this.props.series, this.props.startAtZero),
      Range(this.props.height, true));

    var ticksY = scaleY.ticks(this.props.numTicks);

    var tickPaddingY = this.getTickPadding(
      this.props.index,
      this.props.margins);

    return (
      <g className={classNames('timeseries-group', this.props.className)}>

        {this.props.index === 0 ? (
          <HorizontalGridLines
            scale={scaleY}
            ticks={ticksY}
            width={this.props.width} />
        ) : null}

        {this.props.series.map((datum, index) => {
          var TimeSeries = this.getTimeSeries(datum.type);
          return (
            <TimeSeries className={datum.className}
              data={datum.data}
              height={this.props.height}
              key={index}
              scaleX={scaleX}
              scaleY={scaleY}
              style={datum.style}
              width={this.props.width} />
          );
        })}

        {this.props.index < 2 ? (
          <LinearAxis className={'timeseries-axis-y'}
            height={this.props.height}
            orient={this.props.index ? 'right' : 'left'}
            scale={scaleY}
            tickPadding={tickPaddingY}
            ticks={ticksY}
            x={this.props.index ? this.props.width : 0}
            y={-this.props.margins.top} />
        ) : null}

      </g>
    );
  }

});
