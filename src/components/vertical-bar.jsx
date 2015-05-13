var React = require('react');
var { bool, number, object, string } = React.PropTypes;
var { getTranslateFromCoords } = require('../utils/svg-util');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    active: bool.isRequired,
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
      active: false,
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
    var active = this.props.active ? 'active' : null;
    return (
      <g className={classNames('vertical-bar', this.props.className, active)}
        style={this.props.style}
        transform={getTranslateFromCoords(this.props.x, this.props.y)}>
        <rect className={'vertical-bar-fill'}
          height={this.props.height}
          width={this.props.width} />
      </g>
    );
  }

});
