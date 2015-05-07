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
    var translate = getTranslateFromCoords(
      this.props.x + Math.ceil(this.props.width / 2),
      this.props.y);

    return (
      <g transform={translate}>
        <rect
          height={this.props.height}
          style={this.props.style}
          width={this.props.width - 1}
          x={Math.ceil(-this.props.width / 2)} />
      </g>
    );
  }

});