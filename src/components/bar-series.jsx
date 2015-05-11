var React = require('react');
var { array, func, number, object, string } = React.PropTypes;
var classNames = require('classnames');
var VerticalBar = require('./vertical-bar.jsx');

module.exports = React.createClass({

  propTypes: {
    barSpacing: number.isRequired,
    className: string,
    data: array.isRequired,
    height: number.isRequired,
    scaleX: func.isRequired,
    scaleY: func.isRequired,
    style: object,
    width: number.isRequired
  },

  getDefaultProps: function() {
    return {
      barSpacing: 0,
      data: [],
      height: 0,
      legendLabel: '',
      scaleX: Function,
      scaleY: Function,
      width: 0
    };
  },

  render: function() {
    var barWidth = Math.floor(this.props.width / this.props.data.length);
    var zeroY = Math.round(this.props.scaleY(0));

    return (
      <g className={classNames('bar-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var barHeight = Math.ceil(
            zeroY - this.props.scaleY(Math.abs(datum.value)));

          var x = Math.floor(
            (barWidth * index) +
            (this.props.barSpacing / 2)
          );

          var y = datum.value > 0 ? zeroY - barHeight : zeroY;

          return (
            <VerticalBar className={datum.className}
              height={barHeight}
              index={index}
              key={index}
              style={datum.style}
              timestamp={datum.timestamp}
              value={datum.value}
              valueFormatted={datum.valueFormatted}
              width={barWidth - this.props.barSpacing}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
