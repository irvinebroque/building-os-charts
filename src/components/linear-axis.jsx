var React = require('react');
var { array, bool, func, number, oneOf, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var { format } = require('../formatters/number-formatter');
var { getRotate } = require('../utils/svg-util');
var classNames = require('classnames');
var Label = require('./label.jsx');

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

  getDefaultProps: function() {
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

  render: function() {

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
      <g className={'linear-axis'}
        transform={getTranslateFromCoords(this.props.x, 0)}>

        <line className={'linear-axis-divider'}
          x1={0}
          y1={this.props.y}
          x2={0}
          y2={this.props.height} />

        {ticks.map((datum, index) => {
          return (
            <text className={classNames('linear-axis-tick-label', this.props.orient)}
              key={index}
              style={this.props.style}
              x={x}
              y={Math.ceil(this.props.scale(datum))}>
              {format(datum)}
            </text>
          );
        })}

        {this.props.showDividerAtZero ? (
          <line className={'linear-axis-divider'}
            x1={0}
            y1={this.props.zeroY}
            x2={this.props.contentWidth}
            y2={this.props.zeroY} />
        ) : null}

        <Label className={'linear-axis-label'}
          text={this.props.label}
          transform={rotate}
          x={labelX}
          y={labelY} />

      </g>
    );
  }

});
