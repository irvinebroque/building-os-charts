var React = require('react');
var { array, bool, func, number, oneOf, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var { format } = require('../formatters/number-formatter');
var { getRotate } = require('../utils/svg-util');
var Divider = require('./divider');
var TickLabel = require('./tick-label');
var AxisLabel = require('./axis-label');

module.exports = React.createClass({

  propTypes: {
    contentWidth: number.isRequired,
    height: number.isRequired,
    label: string.isRequired,
    numTicks: number.isRequired,
    orient: oneOf(['left', 'right']).isRequired,
    scale: func.isRequired,
    showDividerAtZero: bool.isRequired,
    tickPadding: number.isRequired,
    ticks: array.isRequired,
    x: number.isRequired,
    y: number.isRequired,
    zeroY: number.isRequired
  },

  getDefaultProps() {
    return {
      contentWidth: 0,
      height: 0,
      label: '',
      numTicks: 0,
      orient: 'left',
      scale: Function,
      showDividerAtZero: true,
      tickPadding: 0,
      ticks: [],
      x: 0,
      y: 0,
      zeroY: 0
    };
  },

  render() {
    var ticks = this.props.scale.ticks(this.props.numTicks);

    var labelX, labelY, rotate, x;
    if (this.props.orient === 'right') {
      labelX = Math.round(this.props.height / 2);
      labelY = this.props.tickPadding;
      rotate = getRotate(90);
      x = this.props.tickPadding;
    } else {
      labelX = Math.round(-this.props.height / 2);
      labelY = this.props.tickPadding;
      rotate = getRotate(270);
      x = -this.props.tickPadding;
    }

    return (
      <g
        className={'linear-axis'}
        transform={getTranslateFromCoords(this.props.x, 0)}>

        <Divider
          x1={0}
          x2={0}
          y1={this.props.y}
          y2={this.props.height} />

        {ticks.map((datum, index) => {
          return (
            <TickLabel className={this.props.orient}
              key={index}
              text={format(datum)}
              x={x}
              y={Math.ceil(this.props.scale(datum))} />
          );
        })}

        {this.props.showDividerAtZero ? (
          <Divider
            x1={0}
            x2={this.props.contentWidth}
            y1={this.props.zeroY}
            y2={this.props.zeroY} />
        ) : null}

        <AxisLabel
          text={this.props.label}
          transform={rotate}
          x={labelX}
          y={labelY} />

      </g>
    );
  }

});
