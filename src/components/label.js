var React = require('react');
var { number, object, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    style: object,
    text: string.isRequired,
    transform: string,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps() {
    return {
      text: '',
      x: 0,
      y: 0
    };
  },

  render() {
    return (
      <text
        className={classNames('label', this.props.className)}
        style={this.props.style}
        transform={this.props.transform}
        x={this.props.x}
        y={this.props.y}>
        {this.props.text}
      </text>
    );
  }

});
