var React = require('react');
var { array, bool, func, number, oneOf, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var { format } = require('../formatters/number-formatter');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    contentWidth: number.isRequired,
    height: number.isRequired,
    numTicks: number.isRequired,
    orient: oneOf(['left', 'right']).isRequired,
    scale: func.isRequired,
    showDividerAtZero: bool.isRequired,
    tickPadding: number.isRequired,
    ticks: array.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      contentWidth: 0,
      height: 0,
      numTicks: 0,
      orient: 'left',
      scale: Function,
      showDividerAtZero: true,
      tickPadding: 0,
      ticks: [],
      x: 0,
      y: 0
    };
  },

  render: function() {
    var ticks = this.props.scale.ticks(this.props.numTicks);
    var zeroY = Math.ceil(this.props.scale(0));
    var x = this.props.orient === 'right' ?
      this.props.tickPadding :
      -this.props.tickPadding;

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
            <text className={classNames('linear-axis-label', this.props.orient)}
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
            y1={zeroY}
            x2={this.props.contentWidth}
            y2={zeroY} />
        ) : null}

      </g>
    );
  }

});
