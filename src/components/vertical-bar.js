var React = require('react');
var { bool, number, object, string } = React.PropTypes;
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
      <rect className={classNames('vertical-bar', this.props.className, active)}
        height={this.props.height}
        style={this.props.style}
        width={this.props.width}
        x={this.props.x}
        y={this.props.y} />
    );
  }

});
