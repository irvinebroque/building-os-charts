var React = require('react');
var { number, string } = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    className: string,
    x1: number.isRequired,
    x2: number.isRequired,
    y1: number.isRequired,
    y2: number.isRequired
  },

  render() {
    return (
      <line className={classNames('divider', this.props.className)}
        x1={this.props.x1}
        x2={this.props.x2}
        y1={this.props.y1}
        y2={this.props.y2} />
    );
  }

});
