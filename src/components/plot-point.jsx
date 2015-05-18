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
      <circle className={classNames('plot-point', this.props.className, active)}
        cx={this.props.x}
        cy={this.props.y}
        r={Math.round(this.props.width / 2)}
        style={this.props.style} />
    );
  }

});
