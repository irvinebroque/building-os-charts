var React = require('react');
var { func, number, object, string } = React.PropTypes;
var RoundedRect = require('./rounded-rect');

module.exports = React.createClass({

  propTypes: {
    corners: object,
    fill: string,
    height: number.isRequired,
    scale: func.isRequired,
    stroke: string,
    value: number.isRequired,
    width: number.isRequired,
    x: number
  },

  render() {
    return (
      <g className={'horizontal-bar-background'}>
        <rect className={'horizontal-bar-background-interaction-rect'}
          height={this.props.height}
          width={this.props.width} />
        <RoundedRect className={'horizontal-bar-background-fill'}
          corners={this.props.corners}
          fill={this.props.fill}
          height={this.props.height}
          stroke={this.props.stroke}
          width={Math.ceil(this.props.scale(this.props.value))}
          x={Math.ceil(this.props.height / 2)} />
      </g>
    );
  }

});
