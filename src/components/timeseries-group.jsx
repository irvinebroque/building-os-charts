var React = require('react');
var { array, bool, func, number, object, objectOf, oneOf, string } = React.PropTypes;
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
var TimeAxis = require('./time-axis.jsx');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    clampToZero: bool.isRequired,
    height: number.isRequired,
    index: number.isRequired,
    label: string.isRequired,
    margins: objectOf(number).isRequired,
    numTicksY: number.isRequired,
    series: array.isRequired,
    type: oneOf([
      'area',
      'bar',
      'clusteredBar',
      'differenceBar',
      'line',
      'plot',
      'stackedBar'
    ]),
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      clampToZero: true,
      height: 0,
      index: 0,
      label: '',
      margins: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      },
      numTicksY: 5,
      series: [],
      width: 0
    };
  },

  getOffset: function(groupType, series, tickWidth) {
    var offset = Math.floor(tickWidth / 2);

    if (this.isBarBased(groupType)) {
      return offset;
    }

    for (var ii = 0, nn = series.length; ii < nn; ii++) {
      if (this.isBarBased(series[ii].type)) {
        return offset;
      }
    }

    return 0;
  },

  getTimeSeries: function(groupType, seriesType) {
    var type = seriesType ? seriesType : groupType;
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

  isBarBased: function(type) {
    switch (type) {
      case 'bar':
      case 'clusteredBar':
      case 'differenceBar':
      case 'plot':
      case 'stackedBar':
        return true;
      default:
        return false;
    }
  },

  render: function() {

    var domainX = TimeDomain(this.props.series);
    var domainY = LinearDomain(
      this.props.series,
      this.props.clampToZero);

    var rangeX = Range(this.props.width);
    var rangeY = Range(this.props.height, true);

    var scaleX = TimeScale(domainX, rangeX);
    var scaleY = LinearScale(domainY, rangeY);

    var zeroY = Math.round(scaleY(0));

    var tickPaddingX = Math.ceil(
      this.props.margins.bottom / 10);
    var tickPaddingY = this.props.index ?
      Math.ceil(this.props.margins.right / 10) :
      Math.floor(this.props.margins.left / 10);

    var numTicksX = this.props.series[0].data ?
      this.props.series[0].data.length : 0;
    var tickWidth = Math.floor(this.props.width / numTicksX);

    var offset = this.getOffset(
      this.props.type,
      this.props.series,
      tickWidth);

    var stretch = offset ? false : true;

    return (
      <g className={classNames('timeseries-group', this.props.className)}>

        {this.props.index === 0 ? (
          <HorizontalGridLines
            numTicks={this.props.numTicksY}
            scale={scaleY}
            width={this.props.width} />
        ) : null}

        {this.props.series.map((datum, index) => {
          var TimeSeries = this.getTimeSeries(this.props.type, datum.type);
          return (
            <TimeSeries className={datum.className}
              comparisonData={datum.comparisonData}
              data={datum.data}
              height={this.props.height}
              index={index}
              key={index}
              numSeries={this.props.series.length}
              offset={offset}
              scaleX={scaleX}
              scaleY={scaleY}
              stretch={datum.stretch ? datum.stretch : stretch}
              style={datum.style}
              tickWidth={tickWidth}
              width={this.props.width}
              zeroY={zeroY} />
          );
        })}

        {this.props.index < 2 ? (
          <LinearAxis
            contentWidth={this.props.width}
            height={this.props.height}
            label={this.props.label}
            numTicks={this.props.numTicksY}
            orient={this.props.index ? 'right' : 'left'}
            scale={scaleY}
            showDividerAtZero={this.props.index ? false : true}
            tickPadding={tickPaddingY}
            x={this.props.index ? this.props.width : 0}
            y={-this.props.margins.top}
            zeroY={zeroY} />
        ) : null}

        {this.props.index === 0 ? (
          <TimeAxis
            domain={domainX}
            numTicks={numTicksX}
            scale={scaleX}
            tickPadding={tickPaddingX}
            tickWidth={tickWidth}
            width={this.props.width}
            x={0}
            y={this.props.height} />
        ) : null}

      </g>
    );
  }

});
