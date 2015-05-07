var React = require('react');
var { func, number, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    height: number.isRequired,
    numTicks: number.isRequired,
    orient: string.isRequired,
    scale: func.isRequired,
    tickPadding: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      numTicks: 5,
      orient: 'left',
      scale: Function,
      tickPadding: 0,
      x: 0,
      y: 0
    };
  },

  getLabelX: function(orient, tickPadding) {
    return orient === 'right' ? tickPadding : -tickPadding;
  },

  render: function() {
    var ticks = this.props.scale.ticks(this.props.numTicks);
    var labelX = this.getLabelX(this.props.orient, this.props.tickPadding);

    return (
      <g className={classNames('linear-axis', this.props.className)}
        transform={getTranslateFromCoords(this.props.x, 0)}>

        {ticks.map((datum, index) => {
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

        <line className={'linear-axis-divider'}
          x1={0} y1={this.props.y}
          x2={0} y2={this.props.height} />

      </g>
    );
  }

});
