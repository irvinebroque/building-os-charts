var React = require('react');
var { number, string } = React.PropTypes;
var Label = require('./label');
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    text: string.isRequired,
    x: number.isRequired,
    y: number.isRequired
  },

  getDefaultProps: function() {
    return {
      text: '',
      x: 0,
      y: 0
    };
  },

  render: function() {
    return (
      <Label className={classNames('tick-label', this.props.className)}
        text={this.props.text}
        x={this.props.x}
        y={this.props.y} />
    );
  }

});
