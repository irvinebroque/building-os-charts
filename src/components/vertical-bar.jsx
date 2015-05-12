var React = require('react');
var { number, object, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');

module.exports = React.createClass({

  propTypes: {
    className: string,
    height: number.isRequired,
    index: number.isRequired,
    style: object,
    timestamp: object.isRequired,
    value: number.isRequired,
    valueFormatted: string,
    width: number.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      height: 0,
      index: 0,
      timestamp: new Date(),
      value: 0,
      width: 0,
      x: 0,
      y: 0
    };
  },

  render: function() {
    return (
      <g className={'vertical-bar'}
        style={this.props.style}
        transform={getTranslateFromCoords(this.props.x, this.props.y)}>
        <rect className={'vertical-bar-fill'}
          height={this.props.height}
          width={this.props.width} />
      </g>
    );
  }

});
