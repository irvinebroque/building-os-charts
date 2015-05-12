var React = require('react');
var { array, func, number, object, string } = React.PropTypes;
var classNames = require('classnames');
var VerticalBar = require('./vertical-bar.jsx');
var { isValid } = require('../validators/number-validator');

module.exports = React.createClass({

  propTypes: {
    barSpacing: number,
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    index: number.isRequired,
    numSeries: number.isRequired,
    scaleX: func.isRequired,
    scaleY: func.isRequired,
    style: object,
    tickWidth: number.isRequired,
    type: string.isRequired,
    width: number.isRequired,
    zeroY: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      index: 0,
      legendLabel: '',
      numSeries: 0,
      scaleX: Function,
      scaleY: Function,
      tickWidth: 0,
      type: '',
      width: 0,
      zeroY: 0
    };
  },

  render: function() {

    var barSpacing = isValid(this.props.barSpacing) ?
      this.props.barSpacing : Math.floor(this.props.tickWidth / 3);

    var barWidth = Math.floor(
      (this.props.tickWidth - barSpacing) / this.props.numSeries);

    return (
      <g className={classNames('clustered-bar-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var barHeight = Math.round(
            this.props.zeroY - this.props.scaleY(Math.abs(datum.value)));

          var x = Math.floor(
            (this.props.tickWidth * index) +
            (barWidth * this.props.index) +
            (barSpacing / 2)
          );

          var y = datum.value > 0 ?
            this.props.zeroY - barHeight :
            this.props.zeroY;

          return (
            <VerticalBar className={datum.className}
              height={barHeight}
              index={index}
              key={index}
              style={datum.style}
              timestamp={datum.timestamp}
              value={datum.value}
              valueFormatted={datum.valueFormatted}
              width={barWidth}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
