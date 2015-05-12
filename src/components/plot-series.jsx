var React = require('react');
var { array, func, number, object, string } = React.PropTypes;
var classNames = require('classnames');
var PlotPoint = require('./plot-point.jsx');

module.exports = React.createClass({

  propTypes: {
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    scaleY: func.isRequired,
    style: object,
    tickWidth: number.isRequired,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      legendLabel: '',
      scaleX: Function,
      scaleY: Function,
      tickWidth: 0,
      width: 0
    };
  },

  render: function() {

    return (
      <g className={classNames('plot-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var x = Math.floor(
            (this.props.tickWidth * index) +
            (this.props.tickWidth / 2)
          );

          var y = Math.round(this.props.scaleY(datum.value));

          return (
            <PlotPoint
              index={index}
              key={index}
              style={datum.style}
              timestamp={datum.timestamp}
              value={datum.value}
              valueFormatted={datum.valueFormatted}
              width={this.props.tickWidth}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
