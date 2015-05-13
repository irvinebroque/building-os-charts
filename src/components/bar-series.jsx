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
    offset: number.isRequired,
    scaleX: func.isRequired,
    scaleY: func.isRequired,
    style: object,
    tickWidth: number.isRequired,
    width: number.isRequired,
    zeroY: number.isRequired
  },

  getDefaultProps: function() {
    return {
      barSpacing: 2,
      data: [],
      height: 0,
      legendLabel: '',
      offset: 0,
      scaleX: Function,
      scaleY: Function,
      tickWidth: 0,
      width: 0,
      zeroY: 0
    };
  },

  render: function() {
    return (
      <g className={classNames('bar-series', this.props.className)}
        style={this.props.style}>

        {this.props.data.map((datum, index) => {

          var barHeight = Math.round(
            this.props.zeroY - this.props.scaleY(Math.abs(datum.value)));

          var x = Math.floor((this.props.tickWidth * index));

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
              width={this.props.tickWidth - this.props.barSpacing}
              x={x}
              y={y} />
          );
        })}

      </g>
    );
  }

});
