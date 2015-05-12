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
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      data: [],
      height: 0,
      legendLabel: '',
      scaleX: Function,
      scaleY: Function,
      width: 0
    };
  },

  render: function() {
    var pointWidth = Math.floor(this.props.width / this.props.data.length);

    return (
      <g className={classNames('plot-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var x = Math.floor(
            (pointWidth * index) +
            (pointWidth / 2)
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
              width={pointWidth}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
