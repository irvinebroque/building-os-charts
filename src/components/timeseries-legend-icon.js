var React = require('react');
var { number, object, oneOf } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    height: number.isRequired,
    style: object,
    type: oneOf([
      'area',
      'bar',
      'clusteredBar',
      'differenceBar',
      'line',
      'plot',
      'stackedBar'
    ]).isRequired,
    width: number.isRequired
  },

  getDefaultProps() {
    return {
      height: 0,
      type: 'bar',
      width: 0
    };
  },

  render() {
    var style = {};
    if (this.props.style) {
      style.rect = {
        fill: this.props.style.fill
      };
      style.line = {
        fill: '#fff',
        stroke: this.props.style.stroke
      };
      style.circle = {
        fill: this.props.style.fill,
        stroke: '#fff'
      };
    }

    var centerX = Math.round(this.props.width / 2);
    var centerY = Math.round(this.props.height / 2);
    var radius = centerY - 1;

    return (
      <g className={classNames('timeseries-legend-icon', this.props.type)}>
        { this.props.type === 'bar' ||
          this.props.type === 'clusteredBar' ||
          this.props.type === 'differenceBar' ||
          this.props.type === 'stackedBar' ? (
          <rect
            height={this.props.height}
            style={style.rect}
            width={this.props.width} />
        ) : null}

        { this.props.type === 'area' ||
          this.props.type === 'line' ? (
          <g>
            <line
              style={style.line}
              x1={0}
              y1={centerY}
              x2={this.props.width}
              y2={centerY} />
            <circle
              cx={centerX}
              cy={centerY}
              r={centerY}
              style={style.line} />
          </g>
        ) : null}

        {this.props.type === 'plot' ? (
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            style={style.circle} />
        ) : null}
      </g>
    );
  }

});
