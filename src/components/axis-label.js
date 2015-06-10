var React = require('react');
var { number, string } = React.PropTypes;
var Label = require('./label');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
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
      <Label
        className={classNames('axis-label', this.props.className)}
        text={this.props.text}
        transform={this.props.transform}
        x={this.props.x}
        y={this.props.y} />
    );
  }

});
