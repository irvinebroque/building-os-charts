var React = require('react');
var { number, object, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    fillHeight: number.isRequired,
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
      fillHeight: 0,
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
      <g className={classNames('difference-bar', this.props.className)}
        transform={getTranslateFromCoords(this.props.x, this.props.y)}>
        <rect className={'difference-bar-fill'}
          height={Math.abs(this.props.fillHeight)}
          style={this.props.style}
          width={this.props.width}
          y={this.props.fillHeight > 0 ? 0 : this.props.fillHeight} />
      </g>
    );
  }

});
