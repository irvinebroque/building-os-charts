var React = require('react');
var { array, func, number, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    height: number.isRequired,
    orient: string.isRequired,
    scale: func.isRequired,
    tickPadding: number.isRequired,
    ticks: array.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      orient: 'left',
      scale: Function,
      tickPadding: 0,
      ticks: [],
      x: 0,
      y: 0
    };
  },

  getLabelX: function(orient, tickPadding) {
    return orient === 'right' ? tickPadding : -tickPadding;
  },

  render: function() {
    var labelX = this.getLabelX(this.props.orient, this.props.tickPadding);

    return (
      <g className={classNames('linear-axis', this.props.className)}
        transform={getTranslateFromCoords(this.props.x, 0)}>

        <line className={'linear-axis-divider'}
          x1={0} y1={this.props.y}
          x2={0} y2={this.props.height} />

        {this.props.ticks.map((datum, index) => {
          return (
            <text className={classNames('linear-axis-label', this.props.orient)}
              key={index}
              style={this.props.style}
              x={labelX}
              y={Math.ceil(this.props.scale(datum))}>
              {datum}
            </text>
          );
        })}

      </g>
    );
  }

});
