var React = require('react');
var RoundedRect = require('./rounded-rect.jsx');

module.exports = React.createClass({

  propTypes: {
    corners: React.PropTypes.object,
    fill: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    scale: React.PropTypes.func.isRequired,
    stroke: React.PropTypes.string,
    value: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    x: React.PropTypes.number
  },

  render: function() {
    return (
      <g className={'horizontal-bar-background'}>
        <rect className={'horizontal-bar-background-interaction-surface'}
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
